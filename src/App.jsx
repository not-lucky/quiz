import React, { useState, useEffect } from 'react';
import { Container, Table, Accordion, Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios'
import { decode as base64_decode } from 'base-64';

import "./App.css"

function chunkArray(array, chunkSize) {
  let results = [];

  while (array.length) {
    results.push(array.splice(0, chunkSize));
  }

  return results;
}

const Td = ({ item, selectedId, changeId }) => {
  return (
    <td
      key={ item.id }
      style={ { textAlign: 'center' } }
      className={ `justify-content-center ${selectedId === item.id ? 'selected' : ''}` }
      onClick={ () => changeId(item.id) }>
      { item.name }
    </td>
  )
}

function MyComponent({ selectedId, setSelectedId }) {
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
    },
    {
      "id": 12,
      "name": "Entertainment: Music"
    },
    {
      "id": 13,
      "name": "Entertainment: Musicals & Theatres"
    },
    {
      "id": 14,
      "name": "Entertainment: Television"
    },
    {
      "id": 15,
      "name": "Entertainment: Video Games"
    },
    {
      "id": 16,
      "name": "Entertainment: Board Games"
    },
    {
      "id": 17,
      "name": "Science & Nature"
    },
    {
      "id": 18,
      "name": "Science: Computers"
    },
    {
      "id": 19,
      "name": "Science: Mathematics"
    },
    {
      "id": 20,
      "name": "Mythology"
    },
    {
      "id": 21,
      "name": "Sports"
    },
    {
      "id": 22,
      "name": "Geography"
    },
    {
      "id": 23,
      "name": "History"
    },
    {
      "id": 24,
      "name": "Politics"
    },
    {
      "id": 25,
      "name": "Art"
    },
    {
      "id": 26,
      "name": "Celebrities"
    },
    {
      "id": 27,
      "name": "Animals"
    },
    {
      "id": 28,
      "name": "Vehicles"
    },
    {
      "id": 29,
      "name": "Entertainment: Comics"
    },
    {
      "id": 30,
      "name": "Science: Gadgets"
    },
    {
      "id": 31,
      "name": "Entertainment: Japanese Anime & Manga"
    },
    {
      "id": 32,
      "name": "Entertainment: Cartoon & Animations"
    }
  ]
  // console.log('1000', 1000)
  console.log('dataasdasdsad', data[0].id)

  return (
    <>

      <Table bordered size="sm">
        {/* <thead> */ }
        { chunkArray(data, 4).map((chunk, index) => {
          return (<tr key={ index } className={ "row-height" }>
            { chunk.map((item) => <Td item={ item } selectedId={ selectedId } changeId={ setSelectedId } />
            )
            }
          </tr>)
        }) }
        {/* </thead> */ }
      </Table>

      { selectedId && <p>Selected ID: { selectedId }</p> }

    </>
  );
}

function LoadingButton({ setQuiz }) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://opentdb.com/api.php?amount=10&encode=base64');
        // setQuiz(response.data);
        setQuiz({ results: [{ question: "uwuwu==" }, { question: "quwjeqwiojeiojwoejo==" }] })
        return new Promise((resolve) => setTimeout(resolve, 3000));
        // return response;
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoading) {

      // fetchData().then(() => {
      //   console.log("done");
      // });
      // setLoading(false);

      axios.get('https://opentdb.com/api.php?amount=10&encode=base64')
        .then(response => {
          setQuiz(response.data);
          console.log('response.data', response.data)
          setLoading(false);
        })
    }

  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="primary"
      disabled={ isLoading }
      onClick={ !isLoading ? handleClick : null }
    >
      { isLoading ? 'Loading…' : 'Click to load' }
    </Button>
  );
}

const ShowQuiz = ({ quiz }) => {
  console.log('quiz', quiz)
  if (!quiz.results) {
    return "";
  }
  return (
    <>
      {
        quiz.results.map((question) => {
          return (
            <p>{ base64_decode(question.question) }</p>
            // <p>{ question.question }</p>
          )
        })
      }
    </>
  )
}

const App = () => {
  const [num, setNum] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');

  const [quiz, setQuiz] = useState({ id: '', results: [] });

  const handleChange = (event) => {
    const temp = event.target.value;
    setNum(temp);
    console.log('num', temp);
  }

  const handleSubmit = (event) => {
    const url = "https://opentdb.com/api.php";
    const a = num ? num : 10;
    const b = selectedId ? "&category=" + selectedId : "";
    const c = difficulty ? "&difficulty=" + difficulty : "";
    const d = type ? "&type=" + type : "";
    const query = url + "?amount=" + a + b + c + d + "&encode=base64";
    console.log('query', query)
  }


  return (
    <Container>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Number of Questions</Accordion.Header>
            <Accordion.Body>
              <Form.Control type="Number" max={ 50 } value={ num } onChange={ handleChange } />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container>
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>

              <MyComponent selectedId={ selectedId } setSelectedId={ setSelectedId } />

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </Container>

      <Container>
        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Type</Accordion.Header>
            <Accordion.Body>
              <Table>
                <tr className='row-height'>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "easy" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("easy") }>
                    Easy
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "medium" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("medium") }>
                    Medium
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${difficulty === "hard" ? 'selected' : ''}` }
                    onClick={ () => setDifficulty("hard") }>
                    Hard
                  </td>
                </tr>
              </Table>
              <p>{ difficulty }</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>

      <Container>
        <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Type</Accordion.Header>
            <Accordion.Body>
              <Table>
                <tr className='row-height'>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${type === "multiple" ? 'selected' : ''}` }
                    onClick={ () => setType("multiple") }>
                    Multiple Choice
                  </td>
                  <td
                    style={ { textAlign: 'center' } }
                    className={ `justify-content-center ${type === "boolean" ? 'selected' : ''}` }
                    onClick={ () => setType("boolean") }>
                    True / False
                  </td>
                </tr>
              </Table>
              <p>{ type }</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={ handleSubmit }>
            Start Quiz
          </Button>
        </div>
      </Container>
      <LoadingButton setQuiz={ setQuiz } />

      <Container>
        <ShowQuiz quiz={ quiz } />
      </Container>
    </Container>

  )
}

export default App;
