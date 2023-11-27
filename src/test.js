import axios from "axios";

console.log("test");
console.log((await axios.get('https://opentdb.com/api.php?amount=10')).data);
