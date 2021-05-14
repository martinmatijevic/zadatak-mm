import React from "react";
import "./recipes.css";
import { Recipes } from "../../data/recipes.js";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  List,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

let buttonGreen = false;

const App = () => {
  const [RecipeList, setList] = React.useState(Recipes);
  const [title, setName] = React.useState("");

  const [modal, setModal] = React.useState(false);
  const [modalRecipe, setModalRecipe] = React.useState(undefined);

  const toggle = (recipe) => {
    setModalRecipe(recipe);
    setModal(!modal);
  };

  const closeBtn = (
    <Button color="danger" onClick={toggle}>
      <FaWindowClose />
    </Button>
  );

  function handleRemove(id) {
    const newList = RecipeList.filter((recipe) => recipe.id !== id);
    setList(newList);
  }

  /*function handleEdit(recipe) {
  
  }*/

  function handleFavorite(id) {
    const newList = RecipeList.map((recipe) => {
      if (recipe.id === id) {
        const updatedItem = {
          ...recipe,
          favourite: !recipe.favourite,
        };
        if (modalRecipe?.id===id) modalRecipe.favourite=!modalRecipe.favourite;
        return updatedItem;        
      }
      return recipe;
    });
    setList(newList);
  }

  function handleChange(event) {
    setName(event.target.value);
    event.target.value ? (buttonGreen = true) : (buttonGreen = false);
  }

  function handleAdd(event) {
    if (title) {
      const newList = RecipeList.concat({
        id: uuidv4(),
        title,
        description: "",
        preparing: "",
        ingridients: "",
        favourite: false,
      });
      setList(newList);
      setName("");
      buttonGreen = false;
    }
    event.preventDefault();
  }

  return (
    <Container>
      <Row>
        <Col xs="9">
          <Form onSubmit={handleAdd}>
            <FormGroup row>
              <Label sm="3" for="recipeName">
                Ime novog recepta:
              </Label>
              <Col sm="5" className="recipeNameInput">
                <Input type="text" id="recipeName" value={title} onChange={handleChange} />
              </Col>
              <Col className="recipeNameButton">{!buttonGreen ? <Button>Dodaj</Button> : <Button color="success">Dodaj</Button>}</Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md="9">
          <span>Svi recepti:</span>
          <div>
            <Row>
              {RecipeList.map((recipe) => (
                <Col lg="6">
                  <Card className="recipeCard">
                    <CardBody>
                      <CardTitle tag="h5">{recipe.title}</CardTitle>
                      <CardText>{recipe.description}</CardText>
                      <CardFooter className="recipeFooter">
                        <Button color="warning" onClick={() => handleFavorite(recipe.id)}>
                          {recipe.favourite ? <AiFillStar /> : <AiOutlineStar />}
                        </Button>
                        <Button color="warning" onClick={() => toggle(recipe)}>
                          Detalji
                        </Button>
                        <Button color="warning" onClick={() => handleRemove(recipe.id)}>
                          <BsFillTrashFill />
                        </Button>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col className="favoriteList">
          {RecipeList.filter((recipe) => recipe.favourite).length > 0 ? (
            <>
              <span>Najdraži recepti:</span>
              <List type="unstyled">
                {RecipeList.filter((recipe) => recipe.favourite).map((recipe) => (
                  <li key={recipe.id}>
                    <Button color="warning" onClick={() => handleFavorite(recipe.id)}>
                      <AiFillStar />
                    </Button>
                    {recipe.title}
                  </li>
                ))}
              </List>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      {modalRecipe && (
        <Modal isOpen={modal} toggle={() => toggle(modalRecipe)}>
          <ModalHeader toggle={() => toggle(modalRecipe)} close={closeBtn}>
            <Button color="warning" onClick={() => handleFavorite(modalRecipe.id)}>
              {modalRecipe.favourite ? <AiFillStar /> : <AiOutlineStar />}
            </Button>
            {modalRecipe.title}
          </ModalHeader>
          <ModalBody>
            <Row>{modalRecipe.description}</Row>
            <hr></hr>
            <Row>Sastojci: {modalRecipe.ingridients}</Row>
            <hr></hr>
            <Row>Priprema: {modalRecipe.preparing}</Row>
          </ModalBody>
          <ModalFooter>
            <Button>
              <FiEdit />
            </Button>
            <Button color="success" onClick={() => toggle(modalRecipe)}>
              Povratak
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  );
};

export class RecipeList extends React.Component {
  render() {
    return <App />;
  }
}
