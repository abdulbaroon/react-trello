"use client"
import React, { useContext, useEffect, useState } from 'react'
import Board from "react-trello"
import EditModal from "./EditModal"
import CustomAddCard from './CustomAddCard'
import NewCardForm from './NewCardForm'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getDatabase, onValue, ref, set } from 'firebase/database'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '@/firebase-config/firebase-methords'
import { AuthContext } from '@/context/auth-context'

const trelloData = {
  "lanes": [
    //   {
    //     "id": "PLANNED",
    //     "title": "Planned Tasks",
    //     "label": "20/70",
    //     "style": { "width": 280 },
    //     "cards": [
    //       {
    //         "id": "Milk",
    //         "title": "Buy milk",
    //         "label": "15 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "2 Gallons of milk at the Deli store"
    //       },
    //       {
    //         "id": "Plan2",
    //         "title": "Dispose Garbage",
    //         "label": "10 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Sort out recyclable and waste as needed"
    //       },
    //       {
    //         "id": "Plan3",
    //         "title": "Write Blog",
    //         "label": "30 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Can AI make memes?"
    //       },
    //       {
    //         "id": "Plan4",
    //         "title": "Pay Rent",
    //         "label": "5 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Transfer to bank account"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "WIP",
    //     "title": "Work In Progress",
    //     "label": "10/20",
    //     "style": { "width": 280 },
    //     "cards": [
    //       {
    //         "id": "Wip1",
    //         "title": "Clean House",
    //         "label": "30 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
    //       }
    //     ]
    //   },
    //   {
    //     "id": "COMPLETED",
    //     "title": "Completed",
    //     "style": { "width": 280 },
    //     "label": "2/5",
    //     "cards": [
    //       {
    //         "id": "Completed1",
    //         "title": "Practice Meditation",
    //         "label": "15 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Use Headspace app"
    //       },
    //       {
    //         "id": "Completed2",
    //         "title": "Maintain Daily Journal",
    //         "label": "15 mins",
    //         "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
    //         "description": "Use Spreadsheet for now"
    //       }
    //     ]
    //   },


  ]
}
const Trello = () => {
  const [eventBus, setEventBus] = useState(null);
  const [trelloLane, setTrelloLane] = useState(null);
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();
  const db = getDatabase(app);
  const cdb = getFirestore();
  const trelloRef = ref(db, `/trelloData`);
  const { currentUser } = useContext(AuthContext)



  useEffect(() => {
    const userRef = ref(db, `/trello`);
    onValue(trelloRef, (snapshot) => {
      const trello = snapshot.val();
      const updatedTrello = trello?.lanes?.map(lane => {
        if (!lane.cards) {
          return {
            ...lane,
            cards: []
          };
        }
        return lane;
      });

      if (trello?.lanes) {
        const finalTrello = { "lanes": updatedTrello }
        setTrelloLane(finalTrello)
      }
      else {
        const finalTrello = { "lanes": [] }
        setTrelloLane(finalTrello)
      }
    });
  }, [db, currentUser]);
  console.log(trelloLane)

  const shouldReceiveNewData = (nextData) => {
    console.log('New card has been added');
    console.log(nextData, "sd");

    set(trelloRef, nextData)

  };
  const handleCardAdd = async (card, laneId) => {

    console.log(`New card added to lane ${laneId}`);
    await setDoc(doc(cdb, "cards", card.id), {
      ...card
    });
    console.log(card);
  };

  const handleClickCard = (card, metadata, laneId) => {
    console.log(card, metadata, laneId)
    const params = new URLSearchParams(searchParams.toString())
    params.set('edit', "true")
    params.set('cardId', card)
    params.set('laneId', laneId)
    replace(`${pathname}?${params.toString()}`);

  }
  const completeCard = () => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    });
    eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    });
  };
  const modalOpen = searchParams.get("edit")
  const handleClose = () => {
    console.log("Sdf")
    replace(`${pathname}`)
  }
  const handleEdit = (laneId,cardId,title) => {
    console.log(laneId,title,"sad")
    // completeCard()
    eventBus.publish(
      {
        type: 'UPDATE_CARD',
        laneId: laneId,
        card: {
          id: cardId,
          title: title,
          // label: "20 mins",
          // description: "Also set reminder (Updated)"
        }
      })
  }

  return (
    <>
      <div className='text-white' onClick={completeCard}>Trello</div>
      <EditModal isOpen={modalOpen} onClose={handleClose} onChangeTrello={handleEdit} />
      {trelloLane ?
        <Board
          editable
          data={
            trelloLane
            // trelloData 
          }
          canAddLanes
          draggable
          onCardClick={handleClickCard}
          onCardAdd={handleCardAdd}
          onDataChange={shouldReceiveNewData}
          eventBusHandle={setEventBus}
          components={{
            AddCardLink: CustomAddCard,
            NewCardForm: NewCardForm  
          }}
        // collapsibleLanes
        // onBeforeCardDelete={() => console.log("deleted")}


        /> : <h1>loading</h1>
      }
    </>
  )
}

export default Trello