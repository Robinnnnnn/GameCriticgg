import React from "react";
import styled from "styled-components";

const TopReviewersContainerRow = styled.tr``;

const TopReviewersContainerHead = styled.thead`
  /* display: flex;
  justify-content: space-between;
  min-width: 300px;
  margin-top: 30px; */
  /* width: 500px; */
`;

const TRMain = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  font-family: "ubuntu";
`;

const TableHeadData = styled.th`
  width: 120px;
  padding: 6px;
`;

const TableBodyData = styled.td`
  width: 120px;
  text-align: center;
  padding: 6px;
  margin-top: 4px;
`;

const TableBodyContainer = styled.tbody`
  padding-top: 30px;
`;

const TableHeadRow = styled.tr`
  border: 2px solid teal;
  border-radius: 8px;
`;

function TopReviewers(props) {
  const { listOfTopReviewers } = props;
  const newListOfReviewers = listOfTopReviewers.reverse();
  return (
    <TRMain id="topReviewersContainer">
      <TopReviewersContainerHead>
        <TableHeadRow>
          <TableHeadData>Rank</TableHeadData>
          <TableHeadData>Critic</TableHeadData>
          <TableHeadData>Points</TableHeadData>
          <TableHeadData># of Reviews</TableHeadData>
        </TableHeadRow>
      </TopReviewersContainerHead>
      <TableBodyContainer>
        {newListOfReviewers.map((user, index) => {
          return (
            <TopReviewersContainerRow key={index}>
              <TableBodyData>{`${index + 1}. `}</TableBodyData>
              <TableBodyData>{user.author}</TableBodyData>
              <TableBodyData>{user.intPoints}</TableBodyData>
              <TableBodyData>{user.numberOfReviews}</TableBodyData>
            </TopReviewersContainerRow>
          );
        })}
      </TableBodyContainer>
    </TRMain>
  );
}

export default TopReviewers;
