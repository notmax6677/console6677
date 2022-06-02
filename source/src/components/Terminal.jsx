import { createSignal, For } from "solid-js";
import Messages from "../js/Messages";
import InputLine from "./InputLine";
import Themes from "../js/Themes";

// css
import "../css/Terminal.css"
import "../css/Stats.css"


const messages = ["$welcome"]

export default function Terminal() {
    const [text, setText] = createSignal(messages);

    // sets the theme for all relevent objects
    const setTheme = () => {
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
        var names = document.getElementsByClassName("name");

        // iterate thru names
        for(var i = 0; i < names.length; i++) {
            // set name color
            names[i].style.color = Themes.current.col3;
        }

        // get all pieces
        var pieces = document.getElementsByClassName("piece");

        // iterate thru pieces
        for(var i = 0; i < pieces.length; i++) {
            // set piece color
            pieces[i].style.color = Themes.current.col3;
            pieces[i].style.textShadow = "0px 0px 5px" + Themes.current.col3; // set shadow color to theme as well
        }

        // set input color
        document.getElementById("input").style.color = Themes.current.col2;
    };

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

                            // call setTheme method
                            setTheme();

                            // return message saying theme is set successfully
                            return (
                                <p style={"color:"+Themes.current.col2}>

                                    Theme set successfully!

                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                        else if(message === "$theme_error") { // if message is "$theme_error"
                            // return a theme error with a span that is the quote piece thing
                            return (
                                <p style={"color:"+Themes.current.col2}>
                                    {Messages.themeError}

                                    <span class="piece" style={"color:"+Themes.current.col3}>{Messages.spans.themeError}</span>.

                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                        else if(message === "$welcome") { // if message is "$welcome"
                            // return a welcome message with a span that is the quote piece thing
                            return (
                                <p style={"color:"+Themes.current.col2}>
                                    {Messages.welcome}

                                    <span class="piece" style={"color:"+Themes.current.col3}>{Messages.spans.help}</span>!

                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                        else if(message === "$help") {
                            return (
                                <p style={"color:"+Themes.current.col2}>
                                    <span class="piece" style={"color:"+Themes.current.col3}>{Messages.spans.availableCommands}</span>

                                    {Messages.help}

                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </p>
                            )
                        }
                        else if(message === "$stats") { // return statistics image that is generated at my copy of a github-stats repo
                            // original: https://github.com/jstrieb/github-stats

                            // my copy: https://github.com/notmax6677/github-stats
                            return (
                                <div>
                                    <img 
                                    src="https://raw.githubusercontent.com/notmax6677/github-stats/8e6a9533a5d6068d8879a48f94b1ba03f5c96204/generated/overview.svg"
                                    alt="user statistics" class="stat-image">
                                    </img>
                                    
                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </div>
                            )
                        }
                        else if(message === "$stats2") { // more stats LMAO
                            // original: https://github.com/jstrieb/github-stats

                            // my copy: https://github.com/notmax6677/github-stats
                            return (
                                <div>
                                    <img 
                                    src="https://raw.githubusercontent.com/notmax6677/github-stats/97f8afa4cf2545f9b017dbc974256901acc9c24f/generated/languages.svg"
                                    alt="user statistics (languages version)" class="stat-image">
                                    </img>
                                    
                                    {/* two line breaks */}
                                    <br></br><br></br>
                                </div>
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