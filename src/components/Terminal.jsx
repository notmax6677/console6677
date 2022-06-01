import { createSignal, For } from "solid-js";
import Messages from "../js/Messages";
import InputLine from "./InputLine";

// css
import "../css/Terminal.css"
import Themes from "../js/Themes";

const messages = [Messages.welcome]

export default function Terminal() {
    const [text, setText] = createSignal(messages);

    return (
        <div id="terminal">

            {/* container for all printed text */}
            <div id="term-text">
                {/* printed text will be added here */}
                <For each={text()}>
                    {(message) => {
                        /* if message is equivalent to code "$name" then create a name element (name is just like e.g: guest@term or smth) */
                        if(message === "$name") {
                            return (
                                <p class="name" style={"color: "+Themes.current.col3}>{Messages.name}</p>
                            )
                        }
                        else if(message === "$clear") { // if found "$clear" token
                            setText(""); // clear out the text
                        }
                        else if(message === "$theme") { // if message is "$theme"
                            // set body to theme
                            document.body.style.backgroundColor = Themes.current.col1;

                            // set border padding to theme
                            document.getElementById("border-padding").style.borderColor = Themes.current.col1;

                            // set terminal outline to theme
                            document.getElementById("border").style.borderColor = Themes.current.col2;

                            // get paragraphs
                            var paragraphs = document.getElementsByTagName("p");

                            // iterate through paragraphs
                            for(var i = 0; i < paragraphs.length; i++) {
                                // set existing paragraphs to theme
                                paragraphs[i].style.color = Themes.current.col2;
                            }

                            // get all existing names
                            var names = document.getElementsByClassName("name")

                            // iterate thru names
                            for(var i = 0; i < names.length; i++) {
                                // set name color
                                names[i].style.color = Themes.current.col3;
                            }

                            // set input color
                            document.getElementById("input").style.color = Themes.current.col2;

                            // return message saying theme is set successfully
                            return (
                                <p style={"color:"+Themes.current.col2}>

                                    Theme set successfully!

                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                        else {
                            return ( /* otherwise just create the message and add two line breaks afterwards */
                                <p style={"color:"+Themes.current.col2}>
                                    {message}
                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                    }}
                </For>
            </div>

            {/* input */}
            <InputLine setText={setText}></InputLine>

            {/* every time enter is pressed, follow this element which is right ahead of the input line, making for a more comfortable experience */}
            <div id="scroll-follow"></div>

            {/* fixed border */}
            <div id="border">
                <div id="border-padding"></div> {/* padding surrounding borders */}
            </div>

            {/* this is needed purely to respond with focusing on the input field when clicked on */}
            <div id="bg" onClick={() => {document.getElementById("input").focus()}}></div>
        </div>
    )
}