import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            soundName: ""
        };

        this.drumRefs = [];
        this.drumAudioRefs = [];

        this.keyClick = this.keyClick.bind(this);
        this.drumClick = this.drumClick.bind(this);

        const createDrumRefs = (arrDrum, arrAudio, numOfElements) => {
            for (var i = 0; i < numOfElements; i++) {
                this.drumRefs.push(React.createRef());
                this.drumAudioRefs.push(React.createRef());
            }
        };

        createDrumRefs(this.drumRefs, this.drumAudioRefs, 9);
    }

    keyClick(event) {
        const keyValue = event.key.toUpperCase();
        const keyPossible = "QWEASDZXC";
        if (keyPossible.indexOf(keyValue) != -1) {
            this.setState(() => ({ soundName: "Clapper " + keyValue }));
            this.drumAudioRefs[keyPossible.indexOf(keyValue)].current.currentTime = 0;
            this.drumAudioRefs[keyPossible.indexOf(keyValue)].current.play();
            this.drumRefs[keyPossible.indexOf(keyValue)].current.style.fontWeight = "bold";
            this.drumRefs[keyPossible.indexOf(keyValue)].current.style.backgroundColor = "#88c8f7";
            setTimeout(() => {
                this.drumRefs[keyPossible.indexOf(keyValue)].current.style.fontWeight = "normal";
                this.drumRefs[keyPossible.indexOf(keyValue)].current.style.backgroundColor = "#e3f2fd";
            }, 100);
        }
    }

    drumClick(event) {
        this.setState(() => ({ soundName: event.target.id }));
        const drumID = event.target.id.replace("Clapper ", "");
        const keyPossible = "QWEASDZXC";
        if (keyPossible.indexOf(drumID) != -1) {
            this.drumAudioRefs[keyPossible.indexOf(drumID)].current.currentTime = 0;
            this.drumAudioRefs[keyPossible.indexOf(drumID)].current.play();
            this.drumRefs[keyPossible.indexOf(drumID)].current.style.fontWeight = "bold";
            this.drumRefs[keyPossible.indexOf(drumID)].current.style.backgroundColor = "#88c8f7";
            setTimeout(() => {
                this.drumRefs[keyPossible.indexOf(drumID)].current.style.fontWeight = "normal";
                this.drumRefs[keyPossible.indexOf(drumID)].current.style.backgroundColor = "#e3f2fd";
            }, 100);
        }
    }

    render() {
        const drumArr = [
            [
                {
                    key: "Q",
                    keySoundName: "Clapper Q",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/40[kb]real-room-clap.wav.mp3"
                },
                {
                    key: "W",
                    keySoundName: "Clapper W",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/34[kb]brightclap.aif.mp3"
                },
                {
                    key: "E",
                    keySoundName: "Clapper E",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/50[kb]Wsh-clap1.wav.mp3"
                }
            ],
            [
                {
                    key: "A",
                    keySoundName: "Clapper A",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/36[kb]c2.aif.mp3"
                },
                {
                    key: "S",
                    keySoundName: "Clapper S",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/41[kb]c4.aif.mp3"
                },
                {
                    key: "D",
                    keySoundName: "Clapper D",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/102[kb]c5.aif.mp3"
                }
            ],
            [
                {
                    key: "Z",
                    keySoundName: "Clapper Z",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/147[kb]clap10.wav.mp3"
                },
                {
                    key: "X",
                    keySoundName: "Clapper X",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/28[kb]clap808.aif.mp3"
                },
                {
                    key: "C",
                    keySoundName: "Clapper C",
                    keySound:
                        "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/30[kb]claps-w_cymb.WAV.mp3"
                }
            ]
        ];

        const createDrumElement = (arr, start) => {
            return arr.map((element, index) => (
                <Col sm={4}
                    className="drum-pad"
                    id={element.keySoundName}
                    key={element.keySoundName}
                    onClick={this.drumClick}
                    ref={this.drumRefs[index + start]}
                >
                    <audio
                        src={element.keySound}
                        className="clip"
                        id={element.key}
                        ref={this.drumAudioRefs[index + start]}
                    ></audio>
                    {element.key}
                </Col>
            ));
        };

        return (
            <Container fluid id="display" onKeyDown={this.keyClick}
                tabIndex="-1">
                <h1>Random Clappers</h1>
                <p id="instructions">Try with your keyboard!</p>
                <Container id="drumSet">
                    <Row>
                        {createDrumElement(drumArr[0], 0)}
                    </Row>
                    <Row>
                        {createDrumElement(drumArr[1], 3)}
                    </Row>
                    <Row>
                        {createDrumElement(drumArr[2], 6)}
                    </Row>
                </Container>
                <p id="playingSign">Now playing: {this.state.soundName} </p>
            </Container>
        );
    }
}