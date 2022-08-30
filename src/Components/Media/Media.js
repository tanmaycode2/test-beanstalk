import "../../assets/css/containers/_media.scss";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { 
    CarouselProvider, 
    Slider, 
    Slide,
    DotGroup,
    ButtonNext,
    ButtonBack
} from 'pure-react-carousel';
import {
    drawLineAndArrow,
    drawEclipse,
    drawText
} from '../Report/utilities';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ReactImageVideoLightbox from 'react-image-video-lightbox';
import Vimeo from '@u-wave/react-vimeo';
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';


export const Media = (props) => {
    const isMobileBreakpiont = useMediaQuery({ query: '(min-width: 0px) and (max-width: 500px)' });
    const isTabletBreakpiont = useMediaQuery({ query: '(min-width: 500px) and (max-width: 900px)' });
    const isDesktopBreakpiont = useMediaQuery({ query: '(min-width: 1500px)' });
    const [totalSlides, setTotalSlides] = useState(0);
    const [media, setMedia] = useState([]);
    const [lightBoxMedia, setLightBoxMedia] = useState([]);
    const [decorations, setPictureDecorations] = useState([]);
    const [showLightBox, setShowLightBox] = useState(false);
    const [currIndx, setCurrentIndx] = useState(0);

    useEffect(() => {
        let decor = [];
        const mediaContent = [];
        if(props.media.videos.length !== 0) {
            props.media.videos.forEach((ele) => {
                mediaContent.push(ele);
            });
        }
        if(props.media.images.length !== 0) {    
            props.media.images.forEach((ele) => {
                mediaContent.push(props.reportUrl+'/'+ele);
            });
        }

        if(!Array.isArray(props.picture_decorations)) {
            decor.push(props.picture_decorations);
        }

        setPictureDecorations(decor);
        setTotalSlides(mediaContent.length);
        setMedia(mediaContent);
        let lbm = [];
        mediaContent.forEach(ele => {
            if(ele.includes('.')) {
                lbm.push({
                    url: ele,
                    type: 'photo',
                    altTag: 'House Inspection details - '+ele
                });
            } else {
                lbm.push({
                    url: `https://player.vimeo.com/video/${ele}`,
                    type: 'video',
                    title: 'Inspection Details Video'
                })
            }
        })
        setLightBoxMedia(lbm);
    }, [props, props.media]);

    const toggleLightBoxView = (index) => {
        setCurrentIndx(index);
        setShowLightBox(!showLightBox);
    }

    let boxWidth = 245;
    let boxHeight = 170;

    return (
        <>
            { showLightBox ?  
                <div style={{ width: "100%", height: "100%", position: "fixed", zIndex: "9" }}>
                    <ReactImageVideoLightbox data={lightBoxMedia} startIndex={currIndx} showResourceCount={true} onCloseCallback={() => toggleLightBoxView(currIndx)} />
                </div>
            : ""}
            {
                media.length !== 0 ?
                <>
                    <CarouselProvider
                        visibleSlides={!isDesktopBreakpiont ? !isTabletBreakpiont ? !isMobileBreakpiont ? 2 : 1 : 3 : 4}
                        totalSlides={totalSlides}
                        step={1}
                        naturalSlideWidth={494}
                        naturalSlideHeight={190}
                        infinite={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        dragStep={1}
                        disableAnimation={false}
                        currentSlide={currIndx}
                        className="media-carousel-container"
                    >
                        <DotGroup className="media-carousel-indicators" />
                        <Slider className="media-carousel-content">
                            {
                                media.map((elem, index) => {
                                    return (
                                        <Slide key={elem} index={index} onClick={() => toggleLightBoxView(index)} className="media-carousel-slide">
                                            {
                                                elem.includes('.') ? 
                                                <div className="media-carousel-image-container">
                                                    <svg id={`svg-design-${index}`} className="svg-clickable" onClick={() => toggleLightBoxView(index)}>
                                                        {
                                                            decorations.length !== 0 ?
                                                                decorations.findIndex(x => x[elem.split('/')[elem.split('/').length - 1]]) !== -1 ?
                                                                    decorations[decorations.findIndex(x => x[elem.split('/')[elem.split('/').length - 1]])][elem.split('/')[elem.split('/').length - 1]]?.map((markings) => {
                                                                        let imgSize = new Image();
                                                                        imgSize.src = elem;
                                                                        let imgWidth = imgSize.width; 
                                                                        let imgHeight = imgSize.height;
                                                                        if(document.getElementById(`svg-design-${index}`) !== null) {
                                                                            boxWidth = parseInt(document.getElementById(`svg-design-${index}`).parentNode.offsetWidth);
                                                                            boxHeight = parseInt(document.getElementById(`svg-design-${index}`).parentNode.offsetHeight);
                                                                        }
                                                                            // console.log(imgWidth,'x',imgHeight);
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
                                                            : ""
                                                        }
                                                    </svg>
                                                    <img className="media-carousel-image" src={elem} alt={`palm-tech - ${elem}`} />
                                                </div>
                                                : <Vimeo className="media-carousel-video" showPortrait={true} controls={true} responsive={true} video={elem} />
                                            }
                                        </Slide>
                                    )
                                })
                            }
                        </Slider>
                        <ButtonBack className="media-btn-left-icon" />
                        <ButtonNext className="media-btn-right-icon" />
                        <ChevronLeftIcon className="media-left-icon"/>
                        <ChevronRightIcon className="media-right-icon" />
                    </CarouselProvider>
                    {isMobileBreakpiont?<div style={{marginBottom:"25px"}}></div>:""}
                </> : ""
            }
        </>
    );
}