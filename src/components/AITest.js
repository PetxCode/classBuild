import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styled from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { MdSystemUpdateAlt } from "react-icons/md";
import storage from "local-storage-fallback";

const AITest = () => {
  const commands = [
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const [note, setNote] = useState([]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition({
    commands,
  });

  const addNotes = async () => {
    const newData = {
      id: note.length + 1,
      title: "Grace for all",
      mgs: transcript,
    };

    setNote([...note, newData]);
  };

  const deleteNotes = async (id) => {
    const data = note.filter((el) => {
      return el.id !== id;
    });
    setNote(data);
  };

  useEffect(() => {
    const saveNote = JSON.parse(storage.getItem("note"));
    setNote(saveNote);
  }, []);

  useEffect(() => {
    storage.setItem("note", JSON.stringify(note));
  }, [note]);

  return (
    <div>
      <Container>
        <Wrapper1>
          <span>Your speech to Text Note:</span>

          {listening ? (
            <Button onClick={SpeechRecognition.stopListening}>stop</Button>
          ) : (
            <Button clg onClick={SpeechRecognition.startListening}>
              start
            </Button>
          )}
          <p>{transcript}</p>
          <SaveIcon
            onClick={() => {
              addNotes();
              resetTranscript();
            }}
          />
        </Wrapper1>
      </Container>
      <Container>
        {note.map(({ id, title, mgs }) => (
          <Wrapper key={id}>
            <Title>
              {mgs.split(" ")[0]}
              ...
            </Title>
            <p>{mgs}</p>
            <DeleteIcon
              onClick={() => {
                deleteNotes(id);
              }}
            />
          </Wrapper>
        ))}
      </Container>
    </div>
  );
};

export default AITest;

const Button = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({ clg }) => (clg ? "green" : "red")};
  width: 60px;
  height: 30px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  transform: scale(1);
  transition: all 350ms;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

const DeleteIcon = styled(AiFillDelete)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: red;
  margin-bottom: 10px;
  cursor: pointer;
`;

const SaveIcon = styled(MdSystemUpdateAlt)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: green;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 25px;
`;

const Title = styled.div`
  background-color: red;
  height: 100px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background-color: lavender;
  border-radius: 10px 10px 0 0;
  box-shadow: rgb(0 0 0/19%) 0px 16px 30px -10px;

  p {
    padding: 0 10px;
    /* margin-bottom: 20px; */
    flex: 1;
  }
`;

const Wrapper1 = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 300px;
  background-color: lavender;
  border-radius: 10px 10px 0 0;
  box-shadow: rgb(0 0 0/19%) 0px 16px 30px -10px;
  justify-content: center;
  align-items: center;

  span {
    font-weight: bold;
    margin: 10px 0;
  }
  p {
    padding: 0 10px;
    font-style: italic;
    /* margin-bottom: 20px; */
    flex: 1;
  }
`;
