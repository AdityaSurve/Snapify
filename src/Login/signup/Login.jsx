import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleButton from "react-google-button";
import { app, database, storage } from "../../components/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import ParticlesComponent from "../../components/Particles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  let navigate = useNavigate();
  const auth = getAuth();
  let googleProv = new GoogleAuthProvider();
  const handleGoogle = () => {
    signInWithPopup(auth, googleProv) //google pop up
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // const user=userCredential.user;
        console.log(user);
        navigate("/explore");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get("email"), data.get("password"))
      .then((userCredential) => {
        // // Signed in
        const user = userCredential.user;
        // ...
        // console.log(user);
        navigate("/explore");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <ParticlesComponent />
      <div className="bg-[#022532] h-screen w-screen z-[10000] flex justify-center items-center overflow-hidden">
        <div className="bg-[#ffffff] h-[80%] w-[40%]  rounded-md z-[10000]">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                // marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="flex flex-row gap-5 justify-center items-center">
                  <h1 className="text-xl font-semibold">Sign in</h1>
                  <Avatar sx={{ bgcolor: "#022532" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                </div>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <GoogleButton
                    style={{
                      width: "450px",
                      height: "50px  ",
                    }}
                    onClick={handleGoogle}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
