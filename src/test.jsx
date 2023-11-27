import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import './App.css'

function CardList() {
    const data = [
        {
            "id": 9,
            "name": "General Knowledge"
        },
        {
            "id": 10,
            "name": "Entertainment: Books"
        },
        {
            "id": 11,
            "name": "Entertainment: Film"
        }
    ];
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (id) => {
        setSelectedCard(id);
        console.log(`Selected card ID: ${id}`);
    };

    return (
        <>
            <Container fluid className="grid-container">
                { data.map((item) => (
                    <Card
                        key={ item.id }
                        onClick={ () => handleCardClick(item.id) }
                        className={ selectedCard === item.id ? 'selected' : '' }
                    >
                        <Card.Body>
                            <Card.Title>{ item.name }</Card.Title>
                        </Card.Body>
                    </Card>
                )) }
            </Container>
        </>

    );
}

export default CardList;
