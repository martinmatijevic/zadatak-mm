import React from "react";
import "./recipes.css";
import { Recipes } from "../../data/recipes.js";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
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
let buttonGreenEdit = false;

const App = () => {
  const [RecipeList, setList] = React.useState(Recipes);

  const [name, setName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [preparing, setPreparing] = React.useState("");
  const [ingridients, setIngridients] = React.useState("");

  const [modal, setModal] = React.useState(false);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalRecipe, setModalRecipe] = React.useState(undefined);
  const [modalRecipeEdit, setModalRecipeEdit] = React.useState(undefined);

  const toggle = (recipe) => {
    setModalRecipe(recipe);
    setModal(!modal);
    if (modalEdit) {
      setModalEdit(!modalEdit);
      setModal(!modal);
    } else setModal(!modal);
  };

  const toggleEdit = (recipe) => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setPreparing(recipe.preparing);
    setIngridients(recipe.ingridients);
    setModalRecipeEdit(recipe);
    if (modal) {
      setModal(!modal);
      setModalEdit(!modalEdit);
    } else setModalEdit(!modalEdit);
  };

  const closeBtn = (
    <Button color="danger" onClick={toggle}>
      <FaWindowClose />
    </Button>
  );

  const closeBtnEdit = (
    <Button color="danger" onClick={toggleEdit}>
      <FaWindowClose />
    </Button>
  );

  function handleRemove(id) {
    const newList = RecipeList.filter((recipe) => recipe.id !== id);
    setList(newList);
  }

  function handleEdit(event) {
    const newList = RecipeList.map((recipe) => {
      if (recipe.id === modalRecipeEdit.id) {
        const updatedItem = {
          ...recipe,
          title: title,
          description: description,
          preparing: preparing,
          ingridients: ingridients,
        };
        return updatedItem;
      }
      return recipe;
    });
    setList(newList);
    setTitle("");
    setDescription("");
    setPreparing("");
    setIngridients("");
    buttonGreenEdit = false;
    event.preventDefault();
    setModalEdit(!modalEdit);
  }

  function handleFavorite(id) {
    const newList = RecipeList.map((recipe) => {
      if (recipe.id === id) {
        const updatedItem = {
          ...recipe,
          favourite: !recipe.favourite,
        };
        if (modalRecipe?.id === id) modalRecipe.favourite = !modalRecipe.favourite;
        return updatedItem;
      }
      return recipe;
    });
    setList(newList);
  }

  function handleChangeNew(event) {
    setName(event.target.value);
    event.target.value ? (buttonGreen = true) : (buttonGreen = false);
  }
  function handleChangeTitle(event) {
    setTitle(event.target.value);
    buttonGreenEdit = true;
  }
  function handleChangeDescription(event) {
    setDescription(event.target.value);
    buttonGreenEdit = true;
  }
  function handleChangePreparing(event) {
    setPreparing(event.target.value);
    buttonGreenEdit = true;
  }
  function handleChangeIngridients(event) {
    setIngridients(event.target.value);
    buttonGreenEdit = true;
  }

  function handleAdd(event) {
    if (name) {
      const newList = RecipeList.concat({
        id: uuidv4(),
        title: name,
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
                <Input type="text" id="recipeName" value={name} onChange={handleChangeNew} />
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
            <Button onClick={() => toggleEdit(modalRecipe)}>Uredi</Button>
            <Button color="primary" onClick={() => toggle(modalRecipe)}>
              Povratak
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {modalRecipeEdit && (
        <Modal isOpen={modalEdit} toggle={() => toggleEdit(modalRecipeEdit)}>
          <Form onSubmit={handleEdit}>
            <ModalHeader toggle={() => toggleEdit(modalRecipeEdit)} close={closeBtnEdit}>
              <Input type="input" value={title} onChange={handleChangeTitle}></Input>
            </ModalHeader>
            <ModalBody>
              <Row>
                Opis: <Input type="textarea" value={description} onChange={handleChangeDescription}></Input>
              </Row>
              <hr></hr>
              <Row>
                Sastojci: <Input type="textarea" value={ingridients} onChange={handleChangeIngridients}></Input>
              </Row>
              <hr></hr>
              <Row>
                Priprema: <Input type="textarea" value={preparing} onChange={handleChangePreparing}></Input>
              </Row>
            </ModalBody>
            <ModalFooter>
              {!buttonGreenEdit ? <Button>Spremi</Button> : <Button color="success">Spremi</Button>}
              <Button color="primary" onClick={() => toggle(modalRecipeEdit)}>
                Povratak
              </Button>
            </ModalFooter>
          </Form>
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
