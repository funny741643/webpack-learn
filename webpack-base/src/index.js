import "./main.css";
import "./sass.scss";
import logo from "../public/logo.png";

const img = new Image();
img.src = logo;
document.getElementById("imgBox").appendChild(img);

class Author {
    name = "Funny";
    age = 18;
    email = "funny@qq.com";

    info = () => {
        return {
            name: this.name,
            age: this.age,
            email: this.email,
        };
    };
}

@log("hi")
class MyClass {}

function log(text) {
    return function (target) {
        target.prototype.logger = () => `${text}，${target.name}`;
    };
}

const test = new MyClass();
test.logger();

module.exports = Author;
