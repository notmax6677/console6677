import Commands from "../js/Commands";
import Messages from "../js/Messages";

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
            }}
            ></input>
        </div>
    )
}