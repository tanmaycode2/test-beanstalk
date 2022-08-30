
export const queryParams = (param) => {

    let queryId1 = "";
    let queryId2 = "";
    let queryId3 = "";
    let queryId4 = "";
    let queryId5 = "";
    let appointmentId = "";
    let token = "";

    if(param.window) {
        let queryParams = new URLSearchParams(window.location.search);
        queryId1 = queryParams.get('id1');
        queryId2 = queryParams.get('id2');
        queryId3 = queryParams.get('id3');
        if (queryParams.get('id4') !== null) queryId4 = queryParams.get('id4').endsWith('.')?queryParams.get('id4').slice(0,-1).toLowerCase():queryParams.get('id4').toLowerCase();
        else queryId4 = queryParams.get('id4');
        queryId5 = queryParams.get('e');
        appointmentId = queryParams.get('appointmentId');
        localStorage.setItem('queryId1', queryId1);
        localStorage.setItem('queryId2', queryId2);
        localStorage.setItem('queryId3', queryId3);
        localStorage.setItem('queryId4', queryId4);
        localStorage.setItem('queryId5', queryId5);
        localStorage.setItem('appointmentId', appointmentId);

        let query = {
            'queryId1': queryId1,
            'queryId2': queryId2,
            'queryId3': queryId3,
            'queryId4': queryId4,
            'queryId5': queryId5,
            'appointmentId': appointmentId
        }

        return [`id1=${queryId1}&id2=${queryId2}&id3=${queryId3}&id4=${queryId4}&e=${queryId5}`, query];
    } else if(param.location) {
        let queryParams = param.location;
        queryId1 = queryParams.state.queryId1;
        queryId2 = queryParams.state.queryId2;
        queryId3 = queryParams.state.queryId3;
        queryId4 = queryParams.state.queryId4;
        queryId5 = queryParams.state.queryId5;

        localStorage.setItem('queryId1', queryId1);
        localStorage.setItem('queryId2', queryId2);
        localStorage.setItem('queryId3', queryId3);
        localStorage.setItem('queryId4', queryId4);
        localStorage.setItem('queryId5', queryId5);
        localStorage.setItem('appointmentId', appointmentId);
        
        let query = {
            'queryId1': queryId1,
            'queryId2': queryId2,
            'queryId3': queryId3,
            'queryId4': queryId4,
            'queryId5': queryId5,
            'appointmentId': appointmentId
        }

        return [`id1=${queryId1}&id2=${queryId2}&id3=${queryId3}&id4=${queryId4}&e=${queryId5}`, query];
    } else if(param.localStorage) {
        if(localStorage) {
            let queryParams = localStorage;
            queryId1 = queryParams.getItem('queryId1');
            queryId2 = queryParams.getItem('queryId2');
            queryId3 = queryParams.getItem('queryId3');
            queryId4 = queryParams.getItem('queryId4');
            queryId5 = queryParams.getItem('queryId5');
            appointmentId = queryParams.getItem('appointmentId');
            token = queryParams.getItem('token');

            let query = {
                'queryId1': queryId1,
                'queryId2': queryId2,
                'queryId3': queryId3,
                'queryId4': queryId4,
                'queryId5': queryId5,
                'appointmentId': appointmentId,
                'token': token
            }

            return [`id1=${queryId1}&id2=${queryId2}&id3=${queryId3}&id4=${queryId4}&e=${queryId5}`, query];
        }
    }
}