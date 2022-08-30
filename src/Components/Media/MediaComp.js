import "../../assets/css/containers/_report.scss";
import "../../assets/css/containers/_media.scss";
import Vimeo from '@u-wave/react-vimeo';
import { useEffect, useState } from "react";
import ReactImageVideoLightbox from 'react-image-video-lightbox';
import { PictureDecoration } from './PictureDecoration';

export const MediaComp = (props) => {
    const [media, setMedia] = useState([]);
    const [lightBoxMedia, setLightBoxMedia] = useState([]);
    const [showLightBox, setShowLightBox] = useState(false);
    const [currIndx, setCurrentIndx] = useState(0);
    const [picture_decoration, setPictureDecoration] = useState([]);

    useEffect(() => {
        let data = [];
        let reportData = props.totalPictures.findIndex(x => x[props.categoryName]) !== -1 ? props.totalPictures[props.totalPictures.findIndex(x => x[props.categoryName])][props.categoryName] : "";
        let reportVideoData = props.totalVideos.findIndex(x => x[props.categoryName]) !== -1 ? props.totalVideos[props.totalVideos.findIndex(x => x[props.categoryName])][props.categoryName] : "";
        let picDecorIdx = props.media.findIndex(x => x[props.categoryName]);

        if(picDecorIdx !== -1) {
            let picDecorContent = props.media[picDecorIdx][props.categoryName];
            if(picDecorContent.length !== 0) {
                picDecorContent.forEach(content => {
                    if(!Array.isArray(content.picture_decorations)) {
                        data.push(content.picture_decorations);
                    }
                });
            }
        }
        setPictureDecoration(data);

        const mediaContent = {
            'categoryName': [],
            'media': []
        };
        if(reportVideoData.length !== 0 ) {
            reportVideoData.forEach((items) => {
                mediaContent.categoryName.push(props.categoryName);
                mediaContent.media.push(items.video_id);
            });
        }

        if(reportData.length !== 0) {
            reportData.forEach((items) => {
                mediaContent.categoryName.push(props.categoryName);
                mediaContent.media.push(props.reportUrl+'/'+items.picture_name);
            });
        }
        
        let lbm = [];
        mediaContent.media.forEach(ele => {
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
        // console.log("lbmmedia",lbm)
        setLightBoxMedia(lbm);
        setMedia(mediaContent);
    }, [props]);
    const toggleLightBoxView = (index) => {
        setCurrentIndx(index);
        setShowLightBox(!showLightBox);
    }

    return (
        <>
        { showLightBox ?  
                <div style={{ width: "100%", height: "100%", position: "fixed", zIndex: "9" }}>
                    <ReactImageVideoLightbox data={lightBoxMedia} startIndex={currIndx} showResourceCount={true} onCloseCallback={() => toggleLightBoxView(currIndx)} />
                </div>
            : ""}
            {media.categoryName?.includes(props.categoryName) ? 
                <div
                    id={media.categoryName.includes(props.categoryName) ? props.categoryName : ""}
                    className="report-main-title-container media-title-header"
                    >
                    <h1 className="report-main-title" style={{marginTop:"-6px"}}>
                        {!props.isLocationTexas ? props.firstIndx + "." : ""}{" "}
                        {props.categoryName}
                    </h1>
                </div> : ""
            }
            <div className="media-container">
                {
                    media.media?.length !== 0 ?
                        media.media?.map((elem,index) => {
                            
                            return (
                                <>
                                    {
                                        elem.includes('.') ?
                                        <>
                                            <PictureDecoration image={elem} className="media-images" index={index} decorations={picture_decoration} handleLightBox={(index) => toggleLightBoxView(index)} /> 
                                        </>
                                        :
                                        <div className="media-video-container"><Vimeo className="media-video" showPortrait={true} controls={true} responsive={true} video={elem} /></div>
                                    }
                                </>
                            )
                        }) 
                    : ""
                }
            </div>
        </>
    );
}