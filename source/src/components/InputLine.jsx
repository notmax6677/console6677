import Commands from "../js/Commands";
import { validCommands } from "../js/Commands";
import Messages from "../js/Messages";
import Themes from "../js/Themes";
import { validThemes } from "../js/Themes";

export default function InputLine(props) {

    // function to get prop text and add new line, along with inputted commands to the end
    const submitText = (e) => {
        // prevent default actions
        e.preventDefault()

        // add $name message
        props.setText((message) => [...message, "$name"]);

        // add value to messages
        props.setText((message) => [...message, e.currentTarget.value]);

        // process command and get output
        let output = Commands.processCommand(e.currentTarget.value)
        // add output to list of messages
        props.setText((message) => [...message, output])

        // reset value to empty string
        e.currentTarget.value = "";
    };

    // changes the color of the current line if theres a correct command
    const confirmCommand = (e) => {
        // get current text, as well as break the text up into an array, separated by spaces
        var command = (e.currentTarget.value + e.key).split(" ");

        // actual value of command that we will be measuring
        var commandValue

        // if there were spaces in the inputted line, then set commandValue to the first word of the command
        if(command.length > 0) {
            commandValue = command[0];
        }
        else { // otherwise set commandValue to the given command cus it's just one word
            commandValue = command; // this makes sure the program can still check if the command is one word without spaces
        }

        var passed = false; // will turn true if currently typed in value is a valid command, defaults to false
        
        // iterate through list of valid commands
        for(var i = 0; i < validCommands.length; i++) {
            // if first word of command is equal to one of the valid commands
            if(commandValue === validCommands[i]) {
                // passed is set to true
                passed = true;
            }
        }

        // if value of first word of command is "theme", and there's more than 
        // one word in the inputted command, and the second word isnt an empty string
        if(commandValue === "theme" && command.length > 1 && command[1] !== "") {
            // default passed to false again
            passed = false

            // iterate through list of valid themes
            for(var i = 0; i < validThemes.length; i++) {
                // if argument to themes command is valid
                if(command[1] === validThemes[i]) {
                    passed = true; // then set passed as true again
                }
            }
        }

        // get input node element
        var input = document.getElementById("input");

        // if inputted value is equivalent to a valid command then set the color of input to valid command color
        if(passed) {
            input.style.color = Themes.current.validCommand;
        } else { // otherwise just set it to the normal text color
            input.style.color = Themes.current.col2;
        }
    };

    return (
        <div id="input-line">
            <p id="input-name" class="name">{Messages.name}</p>


            {/* input */}
            <input id="input" type="text" 
            /* if key down, and key is enter, then run submitText() function */
            onKeyDown={(event) => {
                /* if key is enter */
                if(event.key === "Enter") {
                    submitText(event);
                    // scroll to the scroll-follow element, which is just ahead of the input line, keeping the input line in view
                    document.getElementById("scroll-follow").scrollIntoView(false);
                }
                confirmCommand(event);
            }}
            ></input>
        </div>
    )
}