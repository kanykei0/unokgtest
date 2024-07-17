import { useQuery, gql } from "@apollo/client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  CircularProgress,
} from "@mui/material";
import Detailed from "../Detailed/Detailed";
import { useState } from "react";

const GET_LIMITED_BARCODES = gql`
  query GetLimitedBarcodes($first: Int!, $after: String) {
    barcodes(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          images {
            id
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const BarcodesList = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const { loading, error, data, fetchMore } = useQuery(GET_LIMITED_BARCODES, {
    variables: { first: 9, after: null },
  });

  if (loading)
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  if (error) return <h2>Упс! Что-то пошло не так</h2>;

  const loadMoreBarcodes = () => {
    fetchMore({
      variables: {
        first: 9,
        after: data.barcodes.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          barcodes: {
            ...fetchMoreResult.barcodes,
            edges: [
              ...previousResult.barcodes.edges,
              ...fetchMoreResult.barcodes.edges,
            ],
          },
        };
      },
    });
  };

  return (
    <div>
      <ul className="block">
        {data.barcodes.edges.map(({ node }, key) => {
          return (
            <Card key={key} className="card" sx={{ width: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    "https://uno.kg/_next/image?url=https://api.uno.kg/" +
                    node.images[0].url +
                    "&w=256&q=75"
                  }
                  alt={node.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {node.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="desc"
                    color="text.secondary"
                  >
                    {node.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleOpen(node.id)}
                >
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </ul>
      {data.barcodes.pageInfo.hasNextPage && (
        <div className="button-block">
          <Button onClick={loadMoreBarcodes} variant="contained">
            Загрузить еще
          </Button>
        </div>
      )}
      {selectedId && (
        <Detailed isOpen={open} handleClose={handleClose} id={selectedId} />
      )}
    </div>
  );
};

export default BarcodesList;
