import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';


const CardWrapper = () => {
    const [deck, setDeck] = useState({ deck_id: '', remaining: null });
    const [card, setCard] = useState({ value: 'Joker', suit: 'Deck' });
    const [drawing, setDrawing] = useState(false);

    const timerID = useRef();

    useEffect(() => {
        async function newDeck() {
            try{
                const deck = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
                setDeck(deck.data);
            } catch {
                throw new Error('There was a problem');
            }
        }
        newDeck();
    }, []);

    useEffect(() => {
        const drawCard = async () => {
            try {
                const card = await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
                setCard(card.data.cards[0]);
                if (card.data.remaining === 0) {
                    setDrawing(false);
                    throw new Error('There are no cards left!');
                }
            } catch (err) {
                alert(err);
            }
        };

        if (drawing) {
            timerID.current = setInterval(drawCard, 1000);
        } else {
            clearInterval(timerID.current)
        }
    }, [deck.deck_id, drawing]);
    
    const handleClick = () => {
        setDrawing(!drawing);
    };

    return (
        <main className='CardWrapper'>
            <button onClick={handleClick}>{ drawing ? 'Stop Drawing' : 'Start Drawing' }</button>
            <Card value={card.value} suit={card.suit} />
        </main>
    )
};


export default CardWrapper;