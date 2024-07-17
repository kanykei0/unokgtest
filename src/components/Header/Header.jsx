import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              UnoKG
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
