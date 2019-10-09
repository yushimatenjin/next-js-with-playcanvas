import React, { useEffect, useState } from 'react'
import pc from 'playcanvas'
import styled from 'styled-components'
import {createButton} from '../utils/createButton'
const Canvas = styled.canvas`
    height: 40vh;
    width: 40vw;
`

const Types = styled.div`
   display:"flex";
`
const ModelType = styled.span`
    margin: 5px;
    border: 1px solid #333;
    :hover{
        font-size: 1.5rem;
    }
`
const Page = () => {
    const [modelType, setModelType] = useState("cone")
    const [speed, setSpeed] = useState(300)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const canvas = document.getElementById("application")
            const app = new pc.Application(canvas, {});
            app.start();

            // fill the available space at full resolution
            // app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
            app.setCanvasResolution(pc.RESOLUTION_AUTO);

            // ensure canvas is resized when window changes size
            window.addEventListener('resize', function () {
                app.resizeCanvas();
            });

            const cube = new pc.Entity('cube');
            cube.addComponent('model', {
                type: modelType
            });
            // create camera entity
            const camera = new pc.Entity('camera');
            camera.addComponent('camera', {
                clearColor: new pc.Color(0, 0, 0,0.3)
            });

            // create directional light entity
            const light = new pc.Entity('light');
            light.addComponent('light');

            const button = createButton("START", 0, 0, true);
            app.root.addChild(button)
            // add to hierarchy
            app.root.addChild(cube);
            app.root.addChild(camera);
            app.root.addChild(light);

            // set up initial positions and orientations
            camera.setPosition(0, 0, 3);
            light.setEulerAngles(45, 0, 0);

            // register a global update event
            app.on('update', function (deltaTime) {
                cube.rotate(speed * deltaTime, speed * deltaTime, speed * deltaTime);
            });

        }
    }, [modelType, speed])

    return <div>

        <Types className="types" style={{

        }}>
            <h2>Select model type</h2>
            <ModelType onClick={() => {
                setModelType("cone")
            }}>cone</ModelType>
            <ModelType onClick={() => {
                setModelType("box")
            }}> box</ModelType>
            <ModelType onClick={() => {
                setModelType("sphere")
            }}> sphere</ModelType>
        </Types>
        <h2>Canvas</h2>
        <h2>Model Type: {modelType}</h2>

        <input type="text"
            defaultValue={speed}
            onChange={
                (e) => {
                    const speed = Number(e.target.value)
                    setSpeed(speed)
                }
            } />(20 ~ 999)
            <br />
        <Canvas id="application"></Canvas>
    </div>
}

export default Page