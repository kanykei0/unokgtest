import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, CircularProgress, Container } from "@mui/material";

const style = {
  position: "absolute",
  top: "50px",
  left: "50%",
  transform: "translateX(-50%)",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GET_BARCODE = gql`
  query Barcode($id: ID!) {
    barcode(id: $id) {
      id
      title
      description
      sellingPrice
      discountedPrice
      tags
      category {
        id
        name
        parent {
          id
          name
        }
      }
      images {
        id
        url
      }
      sizes {
        edges {
          node {
            id
            name
            value
          }
        }
      }
    }
  }
`;

const Detailed = ({ isOpen, handleClose, id }) => {
  const { loading, error, data } = useQuery(GET_BARCODE, {
    variables: { id },
    skip: !isOpen,
  });

  if (loading)
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  if (error) return <h2>Упс! Что-то пошло не так</h2>;

  const barcode = data?.barcode;

  const renderCategory = (category) => (
    <>
      {category.name} {category.parent && renderCategory(category.parent)}
    </>
  );

  return (
    <Container>
      <Modal className="modal" open={isOpen} onClose={handleClose}>
        <Box sx={style} className="modal-box">
          <div className="close-btn">
            <Button onClick={handleClose}>
              <Typography variant="h5">X</Typography>
            </Button>
          </div>
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {barcode?.title}
            </Typography>
            {barcode?.discountedPrice == null ? (
              <Typography variant="body2" color="gray">
                {barcode?.sellingPrice} сом
              </Typography>
            ) : (
              <div className="price-block">
                <Typography variant="body2" color="secondary">
                  {barcode?.discountedPrice}
                </Typography>
                <Typography
                  variant="body2"
                  className="price-without"
                  color="gray"
                >
                  {barcode?.sellingPrice}
                </Typography>
                <Typography variant="body2" color="secondary">
                  сом
                </Typography>
              </div>
            )}
            <Typography variant="body1">
              Тэги: {barcode?.tags !== null ? barcode?.tags : "пусто"}
            </Typography>
            <Typography variant="body1">
              {barcode?.sizes.edges.length > 0 ? (
                <>
                  {barcode?.sizes.edges[0].node.name}:{" "}
                  {barcode?.sizes.edges[0].node.value}
                </>
              ) : (
                "кол-во: не указано"
              )}
            </Typography>
            <div>
              <Typography>
                Категории: {renderCategory(barcode?.category)}
              </Typography>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {barcode?.description}
            </Typography>
          </div>
        </Box>
      </Modal>
    </Container>
  );
};

Detailed.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Detailed;
