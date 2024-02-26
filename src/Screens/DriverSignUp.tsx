import { useEffect, useState } from "react";
import MySupClient from "../SupabaseClient";
import './DriverSignUp.css';
import CustomTextField from "../Components/CustomTextField";
import ButtonComp from "../Components/ButtonComp";
import { useNavigate } from "react-router-dom";

export default function DriverSignUp() {

    const navigate = useNavigate();

    const [supabase] = useState(() => MySupClient());
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [loading, setLoading] = useState(false);

    async function userSignUp() {
        if (email === "" || pass1 === "" || pass2 === "") {
            alert("Please fill all the fields");
            return;
        }
        if (pass1 !== pass2) {
            alert("Passwords do not match");
            return;
        }
        if (pass1 === pass2) {
            setLoading(true);
            const data = await supabase.auth.signUp({
                email: email,
                password: pass1
            });
            if (data.error) {
                alert(data.error.message);
                setLoading(false);
                return;
            }

            if (data.data.user?.aud === "authenticated") {
                alert("Please verify your Email ID and proceed to Login.");
                navigate("/driverLogin");
            }

            setLoading(false);

        }
    }

    return (
        loading ?
            <>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="%23FF156D" stroke="%23FF156D" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>'
                </div>
                Loading...
            </>
            :
            < div className="screenHeight">
                <div className="mainContainer">
                    <div className="image">
                    </div>
                    <div className="verticlDivider" />
                    <div className="signupContainer">
                        <CustomTextField placeHolder="Email" onChanged={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <br />
                        <CustomTextField placeHolder="Enter Password" onChanged={(e) => {
                            setPass1(e.target.value)
                        }} />
                        <br />
                        <CustomTextField placeHolder="Re Enter Password" onChanged={(e) => {
                            setPass2(e.target.value)
                        }} />
                        <br />
                        <ButtonComp style={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "#D69F29",
                            color: "white",
                            width: "100%",
                            fontWeight: "bold",
                            fontSize: "20px",
                            borderRadius: "10px",
                        }} text="Sign Up" onClick={async () => { await userSignUp() }} />
                    </div>
                </div>
            </div>)
}