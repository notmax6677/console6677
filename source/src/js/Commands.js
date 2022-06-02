import Messages from "./Messages";
import Themes from "./Themes";

// date variables

// months
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// weeks
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// date object to get current date
const dateObject = new Date();

export default {
    /* processes commands for further action */
    processCommand(command) {
        // returned message
        var returnedMessage = ""

        // get broken down array of separate strings, which are the command separated by spaces
        var brokenCommand = command.split(" ");
        
        // switch case to see the first string of the command
        switch(brokenCommand[0]) {
            // help - shows a help message with available commands
            case "help":
                returnedMessage = Messages.help;
                break;
            
            // about - return an about message
            case "about":
                returnedMessage = Messages.about;
                break;

            // clear - clears the screen
            case "clear":
                returnedMessage = "$clear";
                break;

            // reboot - restart web page
            case "reboot":
                returnedMessage = "Rebooting..."; // return rebooting message
                // after half a second, reload the page
                setTimeout(() => {
                    location.reload();
                }, 500)
                break;
            
            // theme - sets the theme
            case "theme":
                returnedMessage = this.setTheme(brokenCommand[1]);
                break;

            // contact - show contact message
            case "contact":
                returnedMessage = Messages.contact;
                break;

            // github - open github repository page
            case "github":
                returnedMessage = "Opening github repository...";
                // after half a second, open page
                setTimeout(() => {
                    window.open("https://github.com/notmax6677/console6677"); // url to github repository of this project
                }, 500)
                break;

            // date - return date string
            case "date":
                // string with pieces connected together from arrays at beginning of script, and created date object
                returnedMessage = weekDays[dateObject.getDay()] + " | " + dateObject.getDate() + " " + months[dateObject.getMonth()] + " | " + dateObject.getFullYear();
                break;

            case "echo":
                // if text inserted after "echo" isn't nil
                if(brokenCommand[1] !== undefined && brokenCommand[1] !== "") {
                    returnedMessage = command.split("echo")[1];
                }
                else { // otherwise
                    returnedMessage = "echo syntax error.\n\ne.g:\n\necho [text]";
                }
                break;
            
            // if there was no valid command, defaults to the "not a valid command" message
            default:
                returnedMessage = brokenCommand[0] + ": Not a valid command.";
                break;
        }

        // return the message
        return returnedMessage;
    },

    // sets the theme
    setTheme(theme) {
        // create local returned message
        var returnedMessage = "";

        // switch case thru the theme
        switch(theme) {

            // default theme
            case "default":
                returnedMessage = "$theme";
                Themes.current = Themes.default;
                break;
            
            // gruvbox theme
            case "gruvbox":
                returnedMessage = "$theme";
                Themes.current = Themes.gruvbox;
                break;
            
            // gruvbox light theme
            case "gruvbox-light":
                returnedMessage = "$theme";
                Themes.current = Themes.gruvboxLight;
                break;
            
            // solarized theme
            case "solarized":
                returnedMessage = "$theme";
                Themes.current = Themes.solarized;
                break;

            // solarized light theme
            case "solarized-light":
                returnedMessage = "$theme";
                Themes.current = Themes.solarizedLight;
                break;
            
            // dracula theme
            case "dracula":
                returnedMessage = "$theme";
                Themes.current = Themes.dracula;
                break;

            // help message
            case "help":
                returnedMessage = Messages.themeHelp;
                break;

            // if no valid theme was inputted, then show error message
            default:
                returnedMessage = Messages.themeError;
                break;
        }

        // return
        return returnedMessage;
    }
}