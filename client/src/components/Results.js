import React from "react";
import { Table } from "semantic-ui-react";
const Results = ({ mydetails, match }) => {
  return (
    <>
      {mydetails && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Outcome</Table.HeaderCell>
              <Table.HeaderCell>Game Duration</Table.HeaderCell>
              <Table.HeaderCell>Summoner Spells</Table.HeaderCell>
              <Table.HeaderCell>Summoner Runes</Table.HeaderCell>
              <Table.HeaderCell>Champion Name</Table.HeaderCell>
              <Table.HeaderCell>K/DA</Table.HeaderCell>
              <Table.HeaderCell>Items Bought</Table.HeaderCell>
              <Table.HeaderCell>Champion Level</Table.HeaderCell>
              <Table.HeaderCell>Creep Score</Table.HeaderCell>
              <Table.HeaderCell>Creep Score / Min</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {mydetails.stats.win ? "Victory" : "Defeat"}
              </Table.Cell>
              <Table.Cell>
                {Math.floor(match.gameDuration / 60)}:{match.gameDuration % 60}
              </Table.Cell>
              <Table.Cell>Spells</Table.Cell>
              <Table.Cell>Runes</Table.Cell>
              <Table.Cell>{mydetails.championId}</Table.Cell>
              <Table.Cell>K/DA</Table.Cell>
              <Table.Cell>Items</Table.Cell>
              <Table.Cell>{mydetails.stats.champLevel}</Table.Cell>
              <Table.Cell>
                Neutral:
                {mydetails.stats.neutralMinionsKilled}
                <br />
                Total: {mydetails.stats.totalMinionsKilled}
              </Table.Cell>
              <Table.Cell>Creep Score/Min</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default Results;
