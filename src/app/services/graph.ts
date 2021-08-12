import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class GraphClient {
    graphEndpointMe: string;
    graphEndpoint: string;
    graphEndpointBeta: string;

    constructor(
        private http: HttpClient,
        private authService: MsalService
    ) {
        this.graphEndpointMe = 'https://graph.microsoft.com/v1.0/me/';
        this.graphEndpoint = 'https://graph.microsoft.com/v1.0/';
        this.graphEndpointBeta = 'https://graph.microsoft.com/beta/';
    }

    getWithEndpoint(url: string) {
        const endpoint = url;
        return this.http
            .get<any>(endpoint);
    }

    postWithEndpoint(url: string, body: any) {
        const options = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        return this.http
            .post(url, body, options);
    }

    patchWithEndpoint(url: string, body: any) {
        const options = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        return this.http
            .patch(url, body, options);
    }

    getMyAccount() {
        return this.http
            .get<any>(this.graphEndpointMe);
    }

    getAllTeams() {
        const endpoint = this.graphEndpointBeta + `groups?$filter=resourceProvisioningOptions/Any(x:x eq 'Team')`; //  and visibility eq 'Public'
        return this.http
            .get<any>(endpoint);
    }

    getMyTeams() {
        const endpoint = this.graphEndpointMe + 'joinedTeams';
        return this.http
            .get<any>(endpoint);
    }

    getTeamsPhoto(team: string) {
        const endpoint = this.graphEndpointBeta + `teams/${team}/photo/$value`;
        return this.http
            .get<any>(endpoint);
    }

    getGroupChannel(group: string) {
        const endpoint = this.graphEndpoint + `teams/${group}/channels`;
        return this.http
            .get<any>(endpoint);
    }

    getChannelMessage(group: string, channel: string) {
        const endpoint = this.graphEndpointBeta + `teams/${group}/channels/${channel}/messages?$top=100`;
        return this.http
            .get<any>(endpoint);
    }

    getGroupEvents(group: string) {
        const dateTime = this.getNowUTCformatted();
        const endpoint = this.graphEndpoint + `groups/${group}/events?$top=100&$select=subject,body,id,start,end,attendees&$filter=start/dateTime ge '${dateTime}'&$orderby=start/dateTime`;
        return this.http
            .get<any>(endpoint);
    }

    // addToGroup(group: string): Observable<any> {
    //     const endpoint = this.graphEndpoint + `groups/${group}/members/$ref`;
    //     const account = this.authService.instance.getAllAccounts()[0];
    //     const body = {
    //         "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${account.localAccountId}`
    //     };
        
    //     const options = {
    //         headers: {
    //             'Content-type': 'application/json'
    //         }
    //     };
    //     return this.http
    //         .post(endpoint, JSON.stringify(body), options);
        
    // }

    getNowUTCformatted() {
        const date = new Date();
        const month = date.getUTCMonth() + 1 > 9 ? date.getUTCMonth() + 1 : `0${date.getUTCMonth() + 1}`;
        const day = date.getUTCDate() > 9 ? date.getUTCDate() : `0${date.getUTCDate()}`;
    
        const hour = date.getUTCHours() > 9 ? date.getUTCHours() : `0${date.getUTCHours()}`;
        const minute = date.getUTCMinutes() > 9 ? date.getUTCMinutes() : `0${date.getUTCMinutes()}`;
        const second = date.getUTCSeconds() > 9 ? date.getUTCSeconds() : `0${date.getUTCSeconds()}`;
        return `${date.getUTCFullYear()}-${month}-${day}T${hour}:${minute}:${second}`;
    }

    getLocalDateFromUTC(utcDate: string) {
        const date = new Date(utcDate);
        const offset = date.getTimezoneOffset();
        date.setTime(date.getTime() - offset * 60 * 1000);
        return this.getLocalDate(date);
    }

    getLocalDate(d?: Date) {
        const date = d ? new Date(d) : new Date();
        const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    
        const hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        const second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
        return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}