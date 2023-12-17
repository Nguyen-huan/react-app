import { Platform } from "react-native";

let baseUrl = "";

{

        // Platform.OS == 'android'
        //         ? baseUrl = 'https://c910-58-186-90-86.ap.ngrok.io/api/v1/'
        //         : baseUrl = 'https://c910-58-186-90-86.ap.ngrok.io/api/v1/'
        Platform.OS == 'android'
                ? baseUrl = 'https://3868-1-54-215-123.ngrok-free.app/api/v1/'
                : baseUrl = 'https://3868-1-54-215-123.ngrok-free.app/api/v1/'
}
export default baseUrl;