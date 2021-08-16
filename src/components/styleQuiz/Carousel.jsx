import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import anythingIcon from "./imgs/anything.png";
import pillow from "./imgs/pillow.png";
import lamp from "./imgs/lamp.png";
import art from "./imgs/art.png";
import decor from "./imgs/decor.png";
import linen from "./imgs/linens.png";
import storage from "./imgs/storage.png";
import serverware from "./imgs/serverware.png";
import utensils from "./imgs/utensils.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";

//To do:
//Display a message after submit saying thanks for your responses. Our team of experts will start putting together your first order as soon as possible.
//Add a button after message to redirect to user profile

const CarouselContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [style, setStyle] = useState("");
  const [budget, setBudget] = useState("");
  const [room, setRoom] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [avoidArray, setAvoidArray] = useState([]);
  const [checkCount, setCheckCount] = useState(0);

  //Carousel Controls:
  const next = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const updateCurrentSlide = (index) => {
    if (currentSlide !== index) {
      setCurrentSlide(index);
    }
  };

  // Scroll to Top after Style Selection:
  const handleStyleClick = () => {
    window.scrollTo(0, 0);
    next();
  };

  //   CHANGES
  const handleStyleChange = (event) => {
    setStyle(parseInt(event.target.value));
  };

  const handleBudgetChange = (event) => {
    console.log(event.target.value);
    let budgetValue = parseInt(event.target.value);
    setBudget(budgetValue);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleColor1Change = (event) => {
    setColor1(parseInt(event.target.value));
  };

  const handleColor2Change = (event) => {
    setColor2(parseInt(event.target.value));
  };

  const handleColor3Change = (event) => {
    setColor3(parseInt(event.target.value));
  };

  const handleAvoidChange = (event) => {
    let index;
    console.log("AVOID ARRAY:", avoidArray);
    if (event.target.checked) {
      let newValue = event.target.value;
      avoidArray.push(newValue);
      setCheckCount(checkCount + 1);
    } else {
      index = avoidArray.indexOf(event.target.value);
      avoidArray.splice(index, 1);
      setCheckCount(checkCount - 1);
    }
  };

  // SUBMITS
  const handleBudgetSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Budget", budget);
  };

  const handleStyleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Style Category", style);
  };

  const handleRoomSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Room Choice", room);
  };

  const handleColor1Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 1", color1);
  };

  const handleColor2Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 2", color2);
  };

  const handleColor3Submit = (event) => {
    event.preventDefault();
    localStorage.setItem("Color 3", color3);
  };

  const handleAvoidSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("Avoid", avoidArray);
    submitQuizData();
  };

  const submitQuizData = async () => {
    const url = `https://api.interiorize.design/quizzes/add`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 2,
        budget: localStorage.getItem("Budget"),
        color_one_id: localStorage.getItem("Color 1"),
        color_two_id: localStorage.getItem("Color 2"),
        color_three_id: localStorage.getItem("Color 3"),
        category_id: localStorage.getItem("Room Choice"),
        style_id: localStorage.getItem("Style Category"),
      }),
    };
    const response = await fetch(url, requestOptions).then((response) =>
      console.log(response)
    );
  };

  return (
    <Carousel
      autoplay={false}
      showArrows={false}
      showThumbs={false}
      showIndicators={false}
      interval={2200000}
      showStatus={false}
      emulateTouch={false}
      swipeable={false}
      selectedItem={currentSlide}
      onChange={updateCurrentSlide}
    >
      {/* BUDGET */}
      <div className="carouselSlide">
        <h2>What's your budget per shipment?</h2>
        <form onSubmit={(event) => handleBudgetSubmit(event)}>
          <div className="budgetRow">
            <div className="col">
              <input
                id="40"
                type="radio"
                name="budget"
                value="40"
                onChange={(event) => handleBudgetChange(event)}
                aria-label="$40"
                required
              />
              <label for="40" className="firstTier budgetIcon"></label>
              <p>$40</p>
            </div>
            <div className="col">
              <input
                id="80"
                type="radio"
                name="budget"
                value="80"
                onChange={(event) => handleBudgetChange(event)}
                aria-label="$80"
              />
              <label for="80" className="secondTier budgetIcon"></label>
              <p>$80</p>
            </div>
            <div className="col">
              <input
                id="120"
                type="radio"
                name="budget"
                value="120"
                onChange={(event) => handleBudgetChange(event)}
                aria-label="$120"
              />
              <label for="120" className="thirdTier budgetIcon"></label>
              <p>$120</p>
            </div>
          </div>
          <button
            type="submit"
            className="secondaryBtn"
            onClick={budget !== "" ? () => next() : null}
          >
            Next
          </button>
        </form>
      </div>

      {/* STYLE */}

      <div className="carouselSlide">
        <h2>Which picture best describes your style?</h2>
        <form onSubmit={(event) => handleStyleSubmit(event)}>
          <div className="row">
            <div className="styleCol">
              <input
                id="bohemian"
                type="radio"
                name="style"
                value="18"
                onChange={(event) => handleStyleChange(event)}
                aria-label="bohemian"
                required
              />

              <label className="styleImg bohemian" for="bohemian"></label>

              <p>Bohemian</p>
            </div>
            <div>
              <div className="styleCol">
                <input
                  id="farmhouse"
                  type="radio"
                  name="style"
                  value="16"
                  onChange={(event) => handleStyleChange(event)}
                  aria-label="farmhouse"
                />

                <label className="styleImg farmhouse" for="farmhouse"></label>

                <p>Farmhouse</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div>
              <div className="styleCol">
                <input
                  id="contemporary"
                  type="radio"
                  name="style"
                  value="17"
                  aria-label="contemporary"
                  onChange={(event) => handleStyleChange(event)}
                />

                <label
                  className="styleImg contemporary"
                  for="contemporary"
                ></label>

                <p>Contemporary</p>
              </div>
            </div>
            <div>
              <div className="styleCol">
                <input
                  id="modern"
                  type="radio"
                  name="style"
                  value="15"
                  aria-label="modern"
                  onChange={(event) => handleStyleChange(event)}
                />

                <label className="styleImg modern" for="modern"></label>

                <p>Modern</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={style !== "" ? () => handleStyleClick() : null}
            className="secondaryBtn"
          >
            Next
          </button>
        </form>
      </div>

      {/* ROOM SELECTION */}

      <div
        className="carouselSlide"
        onChange={(event) => handleRoomChange(event)}
      >
        <h2>Which room would you like to focus on first?</h2>
        <form onSubmit={(event) => handleRoomSubmit(event)}>
          <div className="roomContainer">
            <div className="roomCol">
              <input
                id="livingRoom"
                type="radio"
                name="room"
                value="Living Room"
                aria-label="Living Room"
                required
              />
              <label for="livingRoom" className="livingRoom roomIcon"></label>
              <p>Living Room</p>
            </div>
            <div className="roomCol">
              <input
                id="bedroom"
                type="radio"
                name="room"
                value="Bedroom"
                aria-label="Bedroom"
              />
              <label for="bedroom" className="bedroom roomIcon"></label>
              <p>Bedroom</p>
            </div>
            <div className="roomCol">
              <input
                id="bathroom"
                type="radio"
                name="room"
                value="Bathroom"
                aria-label="Bathroom"
              />
              <label for="bathroom" className="bathroom roomIcon"></label>
              <p>Bathroom</p>
            </div>
          </div>

          <div className="roomContainer">
            <div className="roomCol">
              <input
                id="kitchen"
                type="radio"
                name="room"
                value="Kitchen"
                aria-label="Kitchen"
              />
              <label for="kitchen" className="kitchen roomIcon"></label>
              <p className="roomLabel">Kitchen</p>
            </div>
            <div className="roomCol">
              <input
                id="patio"
                type="radio"
                name="room"
                value="Patio"
                aria-label="Patio"
              />
              <label for="patio" className="patio roomIcon"></label>
              <p>Patio</p>
            </div>
          </div>

          <button
            className="secondaryBtn"
            type="submit"
            onClick={room !== "" ? () => next() : null}
          >
            Next
          </button>
        </form>
      </div>

      <div className="carouselSlide">
        {/* COLOR SELECTION */}
        <div className="colorContainer">
          <h2>Choose Your First Color</h2>
          <div>
            <form onSubmit={(event) => handleColor1Submit(event)}>
              <div className="colorRow">
                <div className="colorCol">
                  <input
                    id="red"
                    type="radio"
                    name="color"
                    value="1"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="red"
                    required
                  />
                  <label for="red" className="red colorIcon"></label>
                  <p>Red</p>
                </div>
                <div className="colorCol">
                  <input
                    id="blue"
                    type="radio"
                    name="color"
                    value="2"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="blue"
                  />
                  <label for="blue" className="blue colorIcon"></label>
                  <p>Blue</p>
                </div>
                <div className="colorCol">
                  <input
                    id="black"
                    type="radio"
                    name="color"
                    value="3"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="black"
                  />
                  <label for="black" className="black colorIcon"></label>
                  <p>Black</p>
                </div>
                <div className="colorCol">
                  <input
                    id="white"
                    type="radio"
                    name="color"
                    value="4"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="white"
                  />
                  <label for="white" className="white colorIcon"></label>
                  <p>White</p>
                </div>
                <div className="colorCol">
                  <input
                    id="yellow"
                    type="radio"
                    name="color"
                    value="5"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="yellow"
                  />
                  <label for="yellow" className="yellow colorIcon"></label>
                  <p>Yellow</p>
                </div>
              </div>
              <div className="colorRow">
                <div className="colorCol">
                  <input
                    id="green"
                    type="radio"
                    name="color"
                    value="6"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="green"
                  />
                  <label for="green" className="green colorIcon"></label>
                  <p>Green</p>
                </div>
                <div className="colorCol">
                  <input
                    id="purple"
                    type="radio"
                    name="color"
                    value="7"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="purple"
                  />
                  <label for="purple" className="purple colorIcon"></label>
                  <p>Purple</p>
                </div>
                <div className="colorCol">
                  <input
                    id="orange"
                    type="radio"
                    name="color"
                    value="8"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="orange"
                  />
                  <label for="orange" className="orange colorIcon"></label>
                  <p>Orange</p>
                </div>
                <div className="colorCol">
                  <input
                    id="gray"
                    type="radio"
                    name="color"
                    value="10"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="gray"
                  />
                  <label for="gray" className="gray colorIcon"></label>
                  <p>Gray</p>
                </div>
                <div className="colorCol">
                  <input
                    id="brown"
                    type="radio"
                    name="color"
                    value="11"
                    onChange={(event) => handleColor1Change(event)}
                    aria-label="brown"
                  />
                  <label for="brown" className="brown colorIcon"></label>
                  <p>Brown</p>
                </div>
              </div>
              <button
                type="submit"
                className="secondaryBtn"
                onClick={color1 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="carouselSlide">
        {/* COLOR SELECTION 2  */}
        <div className="colorContainer">
          <h2>Choose Your Second Color</h2>
          <div>
            <form onSubmit={(event) => handleColor2Submit(event)}>
              <div className="colorRow">
                <div className={color1 === 1 ? "hidden" : "colorCol"}>
                  <input
                    id="red2"
                    type="radio"
                    name="color2"
                    value="1"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="red"
                    required
                  />
                  <label for="red2" className="red colorIcon"></label>
                  <p>Red</p>
                </div>
                <div className={color1 === 2 ? "hidden" : "colorCol"}>
                  <input
                    id="blue2"
                    type="radio"
                    name="color2"
                    value="2"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="blue"
                  />
                  <label for="blue2" className="blue colorIcon"></label>
                  <p>Blue</p>
                </div>
                <div className={color1 === 3 ? "hidden" : "colorCol"}>
                  <input
                    id="black2"
                    type="radio"
                    name="color2"
                    value="3"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="black"
                  />
                  <label for="black2" className="black colorIcon"></label>
                  <p>Black</p>
                </div>
                <div className={color1 === 4 ? "hidden" : "colorCol"}>
                  <input
                    id="white2"
                    type="radio"
                    name="color2"
                    value="4"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="white"
                  />
                  <label for="white2" className="white colorIcon"></label>
                  <p>White</p>
                </div>
                <div className={color1 === 5 ? "hidden" : "colorCol"}>
                  <input
                    id="yellow2"
                    type="radio"
                    name="color2"
                    value="5"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="yellow"
                  />
                  <label for="yellow2" className="yellow colorIcon"></label>
                  <p>Yellow</p>
                </div>
              </div>
              <div className="colorRow">
                <div className={color1 === 6 ? "hidden" : "colorCol"}>
                  <input
                    id="green2"
                    type="radio"
                    name="color2"
                    value="6"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="green"
                  />
                  <label for="green2" className="green colorIcon"></label>
                  <p>Green</p>
                </div>

                <div className={color1 === 7 ? "hidden" : "colorCol"}>
                  <input
                    id="purple7"
                    type="radio"
                    name="color2"
                    value="7"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="purple"
                  />
                  <label for="purple2" className="purple colorIcon"></label>
                  <p>Purple</p>
                </div>

                <div className={color1 === 8 ? "hidden" : "colorCol"}>
                  <input
                    id="orange2"
                    type="radio"
                    name="color2"
                    value="8"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="orange"
                  />
                  <label for="orange2" className="orange colorIcon"></label>
                  <p>Orange</p>
                </div>
                <div className={color1 === 10 ? "hidden" : "colorCol"}>
                  <input
                    id="gray2"
                    type="radio"
                    name="color2"
                    value="10"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="gray"
                  />
                  <label for="gray2" className="gray colorIcon"></label>
                  <p>Gray</p>
                </div>
                <div className={color1 === 11 ? "hidden" : "colorCol"}>
                  <input
                    id="brown2"
                    type="radio"
                    name="color2"
                    value="11"
                    onChange={(event) => handleColor2Change(event)}
                    aria-label="brown"
                  />
                  <label for="brown2" className="brown colorIcon"></label>
                  <p>Brown</p>
                </div>
              </div>
              <button
                type="submit"
                className="secondaryBtn"
                onClick={color2 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* COLOR SELECTION 3 */}
      <div className="carouselSlide">
        <div className="colorContainer">
          <h2>Choose Your Third Color</h2>
          <div>
            <form onSubmit={(event) => handleColor3Submit(event)}>
              <div className="colorRow">
                <div
                  className={
                    color1 === 1 || color2 === 1 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="red3"
                    type="radio"
                    name="color3"
                    value="1"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="red"
                    required
                  />
                  <label for="red3" className="red colorIcon"></label>
                  <p>Red</p>
                </div>
                <div
                  className={
                    color1 === 2 || color2 === 2 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="blue3"
                    type="radio"
                    name="color3"
                    value="2"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="blue"
                  />
                  <label for="blue3" className="blue colorIcon"></label>
                  <p>Blue</p>
                </div>

                <div
                  className={
                    color1 === 3 || color2 === 3 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="black3"
                    type="radio"
                    name="color3"
                    value="3"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="black"
                  />
                  <label for="black3" className="black colorIcon"></label>
                  <p>Black</p>
                </div>

                <div
                  className={
                    color1 === 4 || color2 === 4 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="white3"
                    type="radio"
                    name="color3"
                    value="4"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="white"
                  />
                  <label for="white3" className="white colorIcon"></label>
                  <p>White</p>
                </div>

                <div
                  className={
                    color1 === 5 || color2 === 5 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="yellow3"
                    type="radio"
                    name="color3"
                    value="5"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="yellow"
                  />
                  <label for="yellow3" className="yellow colorIcon"></label>
                  <p>Yellow</p>
                </div>
              </div>
              <div className="colorRow">
                <div
                  className={
                    color1 === 6 || color2 === 6 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="green3"
                    type="radio"
                    name="color3"
                    value="6"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="green"
                  />
                  <label for="green3" className="green colorIcon"></label>
                  <p>Green</p>
                </div>
                <div
                  className={
                    color1 === 7 || color2 === 7 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="purple3"
                    type="radio"
                    name="color3"
                    value="7"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="purple"
                  />
                  <label for="purple3" className="purple colorIcon"></label>
                  <p>Purple</p>
                </div>
                <div
                  className={
                    color1 === 8 || color2 === 8 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="orange3"
                    type="radio"
                    name="color3"
                    value="8"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="orange"
                  />
                  <label for="orange3" className="orange colorIcon"></label>
                  <p>Orange</p>
                </div>
                <div
                  className={
                    color1 === 10 || color2 === 10 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="gray3"
                    type="radio"
                    name="color3"
                    value="10"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="gray"
                  />
                  <label for="gray3" className="gray colorIcon"></label>
                  <p>Gray</p>
                </div>
                <div
                  className={
                    color1 === 11 || color2 === 11 ? "hidden" : "colorCol"
                  }
                >
                  <input
                    id="brown3"
                    type="radio"
                    name="color3"
                    value="11"
                    onChange={(event) => handleColor3Change(event)}
                    aria-label="brown"
                  />
                  <label for="brown3" className="brown colorIcon"></label>
                  <p>Brown</p>
                </div>
              </div>
              <button
                className="secondaryBtn"
                type="submit"
                onClick={color3 !== "" ? () => next() : null}
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* AVOID */}
      <div className="carouselSlide">
        <h2>Which items should we NOT send you?</h2>
        <form onSubmit={(event) => handleAvoidSubmit(event)}>
          <div className="avoidRow">
            <div className="avoidCol">
              <img
                src={anythingIcon}
                className="avoidIcon"
                alt="dolly with two boxes"
              />
              <input
                type="checkbox"
                id="anything"
                name="avoid"
                value={null}
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="anything">Send me anything!</label>
            </div>
            <div className="avoidCol">
              <img src={pillow} className="avoidIcon" alt="pillow" />
              <input
                type="checkbox"
                id="pillows"
                name="avoid"
                value="Pillow"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="pillows">Pillows</label>
            </div>
            <div className="avoidCol">
              <img src={lamp} className="avoidIcon" alt="lamp" />
              <input
                type="checkbox"
                id="lamps"
                name="avoid"
                value="Lamp"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="lamps">Lamps</label>
            </div>
          </div>
          <div className="avoidRow">
            <div className="avoidCol">
              <img src={art} className="avoidIcon" alt="frame" />
              <input
                type="checkbox"
                id="art"
                name="avoid"
                value="Art"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="art">Art</label>
            </div>
            <div className="avoidCol">
              <img src={decor} className="avoidIcon" alt="house plant" />
              <input
                type="checkbox"
                id="decor"
                name="avoid"
                value="Decor"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="decor">Decor</label>
            </div>
            <div className="avoidCol">
              <img src={linen} className="avoidIcon" alt="kitchen linens" />
              <input
                type="checkbox"
                id="kitchenLinens"
                name="avoid"
                value="Kitchen Linens"
                onChange={(event) => handleAvoidChange(event)}
              />

              <label for="kitchenLinens">Kitchen Linens</label>
            </div>
          </div>
          <div className="avoidRow">
            <div className="avoidCol">
              <img src={storage} className="avoidIcon" alt="cookie jar" />
              <input
                type="checkbox"
                id="storage"
                name="avoid"
                value="Storage"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="storage">Storage</label>
            </div>
            <div className="avoidCol">
              <img src={serverware} className="avoidIcon" alt="serving plate" />
              <input
                type="checkbox"
                id="serverware"
                name="avoid"
                value="Serverware"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="serverware">Serverware</label>
            </div>
            <div className="avoidCol">
            <img src={utensils} className="avoidIcon" alt="cooking utensils" />
              <input
                type="checkbox"
                id="utensils"
                name="avoid"
                value="Utensils"
                onChange={(event) => handleAvoidChange(event)}
              />
              <label for="utensils">Utensils</label>
            </div>
          </div>
          {checkCount === 0 ? (
            <p>Please Choose at Least One Option</p>
          ) : (
            <button type="submit" className="secondaryBtn">
              Submit
            </button>
          )}
        </form>
      </div>
    </Carousel>
  );
};

export default CarouselContainer;
