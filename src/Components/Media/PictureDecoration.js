import React from "react";
import '../../assets/css/containers/_media.scss';
// import Arrow from '@elsdoerfer/react-arrow';
import {
    drawLineAndArrow,
    drawEclipse,
    drawText
} from '../Report/utilities';

export const PictureDecoration = (props) => {
    let imageKey = props.image?.split('/')[props.image?.split('/').length - 1];
    let dIndx = props.decorations?.findIndex(x => x[imageKey]) !== -1 ? props.decorations?.findIndex(x => x[imageKey]) : -1;

    let decorations = [];
    if(dIndx !== -1) {
        decorations = props.decorations[dIndx][imageKey];
    }

    let imgSize = new Image();
    imgSize.src = props.image;
    let imgWidth = imgSize.width; 
    let imgHeight = imgSize.height;

    let boxWidth = 270;
    let boxHeight = 216;
               
    return (     
        <>
            <div className="media-images-overlay">
                <svg id={`svg-design-${props.index}`} className="svg-clickable" onClick={() => props.handleLightBox(props.index)}>
                    {
                        decorations.length !== 0 ?
                            decorations.map((markings) => {
                                if(document.getElementById(`svg-design-${props.index}`) !== null) {
                                    boxWidth = parseInt(document.getElementById(`svg-design-${props.index}`).width.baseVal.value);
                                    boxHeight = parseInt(document.getElementById(`svg-design-${props.index}`).height.baseVal.value);
                                }
                                
                                let lineAndArrow = drawLineAndArrow(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);
                                let drawEclipseContent = drawEclipse(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);
                                let drawTextContent = drawText(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);

                                return (
                                    <>
                                        {
                                            parseInt(markings.decoration_type) === 0 ?
                                            <>
                                                <line
                                                    x1={lineAndArrow.LineX1} 
                                                    y1={lineAndArrow.LineY1} 
                                                    x2={lineAndArrow.LineX2} 
                                                    y2={lineAndArrow.LineY2}
                                                    style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                    strokeWidth={lineAndArrow.strokeWidth} />
                                                <line
                                                    x1={lineAndArrow.arrowStartX1}
                                                    y1={lineAndArrow.arrowStartY1}
                                                    x2={lineAndArrow.LineX2} 
                                                    y2={lineAndArrow.LineY2}
                                                    style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                    strokeWidth={lineAndArrow.strokeWidth} />
                                                <line
                                                    x1={lineAndArrow.arrowStartX2}
                                                    y1={lineAndArrow.arrowStartY2}
                                                    x2={lineAndArrow.LineX2} 
                                                    y2={lineAndArrow.LineY2}
                                                    style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                    strokeWidth={lineAndArrow.strokeWidth} />
                                            </> : parseInt(markings.decoration_type) === 1 ?
                                            <>
                                                <ellipse
                                                    fill="none"
                                                    cx={drawEclipseContent.Vcx}
                                                    cy={drawEclipseContent.Vcy}
                                                    rx={drawEclipseContent.Vrx}
                                                    ry={drawEclipseContent.Vry}
                                                    style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                    strokeWidth={drawEclipseContent.strokeWidth}
                                                />
                                            </> : ""
                                        }
                                        <text x={drawTextContent.X1Text} y={drawTextContent.Y1Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                        <text x={drawTextContent.X2Text} y={drawTextContent.Y2Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                        <text x={drawTextContent.X3Text} y={drawTextContent.Y3Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                        <text x={drawTextContent.X4Text} y={drawTextContent.Y4Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                        <text x={drawTextContent.X5Text} y={drawTextContent.Y5Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                    </>
                                )
                            })
                        : ""
                    }
                </svg>
                <img src={props.image} className="media-images"  onClick={() => props.handleLightBox(props.index)} alt={`pal-tech-images-${props.image}`}/>
            </div>
        </>
    );
}