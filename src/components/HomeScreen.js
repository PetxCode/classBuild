import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillDelete } from "react-icons/ai";
import { MdSystemUpdateAlt } from "react-icons/md";
import axios from "axios";

const HomeScreen = () => {
  const [fetchData, setFetchData] = useState([]);

  const getData = async () => {
    const res = await axios.get("https://letbuild22.herokuapp.com/api");
    if (res) {
      setFetchData(res.data);
      console.log(fetchData);
    }
  };

  const deleteData = async (id) => {
    await axios.delete(`https://buildapi24.herokuapp.com/api/${id}`);

    window.location.reload();
  };

  const updateData = async (id) => {
    const updateFile = {
      done: true,
    };
    await axios.patch(`https://buildapi24.herokuapp.com/api/${id}`, {
      done: true,
    });

    window.location.reload();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {fetchData.map(({ _id, task, done, name }) => (
        <Wrapper key={_id}>
          {done ? <ColorMap clr /> : <ColorMap />}
          <span>{name}</span>
          <Button>
            <Icon2
              onClick={() => {
                updateData(_id);
                console.log(done, _id);
              }}
            />
            <Icon
              onClick={() => {
                deleteData(_id);
                console.log(_id);
              }}
            />
          </Button>
        </Wrapper>
      ))}
    </Container>
  );
};

export default HomeScreen;

const Button = styled.div`
  display: flex;
  height: 20px;
  width: 90%;
  margin-bottom: 10px;
  justify-content: space-between;
`;
const Icon = styled(AiFillDelete)`
  color: red;
  cursor: pointer;
  font-size: 20px;
`;
const Icon2 = styled(MdSystemUpdateAlt)`
  color: green;
  cursor: pointer;
  font-size: 20px;
`;

const ColorMap = styled.div`
  width: 100%;
  height: 120px;
  background-color: ${({ clr }) => (clr ? "green" : "red")};
  border-radius: 10px 10px 0px 0;
`;

const Container = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;
const Wrapper = styled.div`
  width: 200px;
  height: 250px;
  background-color: lavender;
  border-radius: 10px 10px 0px 0;
  border-radius: 10px 10px 0px 0;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  box-shadow: rgb(0 0 0 / 29%) 0px 16px 10px -7px;

  span {
    padding: 10px;
    font-size: 14px;
    font-family: Poppins;
    flex: 1;
  }
`;
