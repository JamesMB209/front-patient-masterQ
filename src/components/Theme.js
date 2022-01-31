import { useState } from "react";

export default function Theme() {
    const [clicked, setClicked] = useState({ status: false});

    const handleDarkMode = () => {
        //state of clicked, and set its status to the opposite of what it was previously
        setClicked(prevState => ({...prevState, status: !clicked.status}
            ));

            //get the Element that we want to update its class
            const theme = document.querySelector(".theme");
            const button = document.querySelector(".addDarkMode");

            //add a class of dark to it using toggle
            theme.classList.toggle("dark");
            button.classList.toggle("dark");

    };

        return (
        <div className="theme">
            Switch Mode
            <button className="addDarkMode" type="button" onClick={handleDarkMode}>
                Switch to {clicked.status ? "Light mode" : "Dark Mode"}
            </button>
        </div>
        )
}