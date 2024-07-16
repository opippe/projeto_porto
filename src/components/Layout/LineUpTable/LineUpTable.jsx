import { Table, Tbody, Td, Th, Thead, Tr, Tag, Box } from "@chakra-ui/react";
import { DragDropContext, Draggable } from "@hello-pangea/dnd";
import Droppable from "./StrictModeDroppable";

const LineUpTable = ({ berco, carga_temp, ships, setShips }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newShips = Array.from(ships);
    const [movedShip] = newShips.splice(result.source.index, 1);
    newShips.splice(result.destination.index, 0, movedShip);
    setShips(newShips);
  };

  return (
    <Box mb="3rem">
      <Tag bg="#3182ce" color="white" p=".5rem 1rem" borderRadius="5px">
        {berco}
      </Tag>
      <Tag
        bg="#3182ce"
        color="white"
        p=".5rem 1rem"
        borderRadius="5px"
        marginLeft="5px"
      >
        {carga_temp}
      </Tag>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="LineUp">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <Thead>
                <Tr>
                  <Th>POS</Th>
                  <Th>IMO</Th>
                  <Th>NOME</Th>
                  <Th>CARGA</Th>
                  <Th>PREVISÃO ATRACAÇÃO</Th>
                  <Th>PREVISÃO DESATRACAÇÃO</Th>
                  <Th>OP</Th>
                  <Th>SITUAÇÃO</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ships.map((ship, index) => (
                  <Draggable
                    key={ship.imo + index}
                    draggableId={ship.imo + index}
                    index={index}
                  >
                    {(provided) => (
                      <Tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Td>{index + 1}</Td>
                        <Td>{ship.imo}</Td>
                        <Td fontWeight="bold">{ship.nome}</Td>
                        <Td>{ship.tipoCarga.join(", ")}</Td>
                        <Td>{ship.PREVISAO_ATRACACAO}</Td>
                        <Td>{ship.PREVISAO_DESATRACACAO}</Td>
                        <Td>{ship.operacao}</Td>
                        <Td>
                          <Tag
                            variant="outline"
                            size="sm"
                            colorScheme={
                              ship.status === "EM_VIAGEM"
                                ? "blue"
                                : ship.status === "ATRACADO"
                                ? "green"
                                : ship.status === "ESPERADO"
                                ? "orange"
                                : ""
                            }
                          >
                            {ship.status}
                          </Tag>
                        </Td>
                      </Tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default LineUpTable;
