import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { GraphClient } from './graph';

export type ListItem = {
    [key: string]: any;
    listItem: {
        title: string | undefined;
        name: string;
        color?: string;
        tag?: string;
        icon?: string;
        events?: MenuContext[];
    };
    
}

export type MenuContext = {
    title: string;
    icon: string;
}

@Injectable()
export class GroupUtils {
    
    constructor(
        private graphClient: GraphClient,
        private route: ActivatedRoute,
        private authService: MsalService
    ) {}

    addToGroup(groupId: string) {
        const endpoint = this.graphClient.graphEndpoint + `groups/${groupId}/members/$ref`;
        const account = this.authService.instance.getAllAccounts()[0];
        const body = {
            "@odata.id": `https://graph.microsoft.com/v1.0/directoryObjects/${account.localAccountId}`
        };
        return this.graphClient.postWithEndpoint(endpoint, body);
    }

    addCalendarEvent(event: any) {
        const groupId = this.route.snapshot.params['teamId'];
        const currentAccount = this.authService.instance.getAllAccounts()[0];
        const attendee = {
            "emailAddress": {
                "address": currentAccount.username,
                "name": currentAccount.name
            },
            "status": {
                "response": "Accepted",
                "time": `${this.graphClient.getNowUTCformatted()}Z`
            },
            "type": "optional"
        };
        let attendees = event.attendees;
        attendees.push(attendee);
        const body = {
            "attendees": attendees
        };

        const endpoint = this.graphClient.graphEndpoint + `groups/${groupId}/calendar/events/${event.id}`;
        return this.graphClient.patchWithEndpoint(endpoint, body);
    }

    getGroup(): Observable<any> {
        const target = {
            'value': 
            [
                {
                    'id': '529043f5-a154-4efa-96a2-8a49dedbe5db',
                    'displayName': 'Architecture Guild',
                    'description': 'Architecture Guild to increase knowledge sharing, professional learning and IP development.',
                    'isMember': false,
                    'photo': ''
                }, 
                {
                    'id': '99298122-9a85-4d85-9e34-ecef7b8c49af',
                    'displayName': 'Guilds @ DXC',
                    'description': 'Guilds @ DXC',
                    'isMember': false,
                    'photo': ''
                },
                {
                    'id': 'dd651bdf-b660-43e6-af20-59a1a318c015',
                    'displayName': 'Technology Guilds@DXC',
                    'description': 'This team is for developers to interact and learn programming languages by collaborating together. Created by EDGE Engineering Global SMEs Team.',
                    'isMember': false,
                    'photo': ''
                }
            ]
        };

        return this.graphClient.getMyTeams().pipe(
            map(data => data.value),
            switchMap(data => {

                // teams meta
                

                const routePath = this.route.snapshot.url;
                const isGuild = JSON.stringify(routePath).indexOf('guild') >= 0;
                if(!isGuild)
                    return of(data.map((d: any) => {
                        d.isMember = true;
                        return d;
                    }));
                else {
                    for (const guild of target.value) {
                        // this.graphClient.getTeamsPhoto(guild.id).subscribe(
                        //     next => {
                        //         guild.photo = next;
                        //     },
                        //     err => {
                        //         throw err;
                        //     }
                        // )

                        if(data.find((d: any) => d.id === guild.id))
                            guild.isMember = true;
                    }
                    return of(target.value);
                }
            })
        );
    }

    getChannel() {
        const groupId = this.route.snapshot.params['teamId'];
        return this.graphClient.getGroupChannel(groupId).pipe(
            map(d => {
                const channelCount = d['@odata.count']
                const summary: {title: string, value: string}[] = [
                    {
                        title: 'Total',
                        value: channelCount
                    },
                    {
                        title: 'Default Channel',
                        value: d.value[0]?.displayName
                    },
                    {
                        title: 'Latest Channel',
                        value: d.value[channelCount - 1]?.displayName
                    },
                ];
                d.summary = summary;

                d.value.map((item: ListItem) => {
                    const listItem: {name: string, title: string, color: string, tag: string, events: any} = {
                        name: item.displayName,
                        title: item.description,
                        color: this.randomBGColor(),
                        tag: 'channel',
                        events: [
                            {
                                title: 'channelMessage',
                                icon: 'file-text-outline'
                            }
                        ]
                        // icon: 'more-horizontal-outline'
                    }
                    item.listItem = listItem;
                    return item;
                })
                return d;
            })
        );
    }

    getEvent() {
        const groupId = this.route.snapshot.params['teamId'];
        const account = this.authService.instance.getAllAccounts()[0];
        
        return this.graphClient.getGroupEvents(groupId).pipe(
            map(d => {
                const eventCount = d.value.length;
                const lastMonth = '';
                const startTime = d.value[0] ? this.graphClient.getLocalDateFromUTC(d.value[0].start.dateTime) : '';
                // const startTime =  d.value[0]? d.value[0].start.dateTime.split('.')[0].replace('T', ' ') : '';

                const summary: {title: string, value: string}[] = [
                    {
                        title: 'Upcoming',
                        value: eventCount
                    },
                    {
                        title: 'Next Event',
                        value: startTime
                    },
                    {
                        title: 'Last Month',
                        value: lastMonth
                    },
                ];
                d.summary = summary;

                d.value.map((item: ListItem) => {
                    const start = this.graphClient.getLocalDateFromUTC(item.start.dateTime);
                    // const start = item.start.dateTime.split('.')[0].replace('T', ' ');
                    const listItem: {name: string, title: string, color: string, tag: string, events?: any, selected?: boolean} = {
                        name: item.subject,
                        title: start,
                        color: this.randomBGColor(),
                        tag: 'event'
                    
                    };
                    if(item.attendees.find((d: any) => d.emailAddress.address == account.username)) {
                        listItem.selected = true;
                        listItem.events = [
                            {
                                title: 'eventDetails',
                                icon: 'file-text-outline'
                            }
                        ];
                    } else {
                        listItem.selected = false;
                        listItem.events = [
                            {
                                title: 'subscribe',
                                icon: 'attach-outline'
                            },
                            {
                                title: 'eventDetails',
                                icon: 'file-text-outline'
                            }
                        ];
                    }
                    item.listItem = listItem;
                    return item;
                })
                return d;
            })
        );
    }

    getPosts(channelId: string) {
        const groupId = this.route.snapshot.params['teamId'];
        const endpoint = this.graphClient.graphEndpointBeta + `teams/${groupId}/channels/${channelId}/messages?$top=100`;
        return this.graphClient.getWithEndpoint(endpoint).pipe(
            map(d => {
                d.placeholders = [];
                d.loading =false;
                d.contextType = 'post';
                return this.fetchContext(d);
            })
        );
    }

    getAllTeams() {
        return this.graphClient.getAllTeams().pipe(
            map(d => {
                d.placeholders = [];
                d.loading = false;
                d.contextType = 'teams';
                return this.fetchContext(d);
            })
        );
    }

    getNextPage(context: any) {
        // if(!context['@odata.nextLink'])
        //     return ;
        return this.graphClient.getWithEndpoint(context['@odata.nextLink']).pipe(
            map(d => {
                if(d['@odata.nextLink'])
                    context['@odata.nextLink'] = d['@odata.nextLink'];
                else
                    delete context['@odata.nextLink'];
                d.contextType = context.contextType;
                const data = this.fetchContext(d);
                context.value.push(...data.value);
                return context;
            })
        );
    }

    fetchContext(data: any) {
        switch (data.contextType) {
            case 'teams':
                data.value.map((item: ListItem) => {
                    // if(item.visibility == 'Private')
                    //     delete item;
                    const listItem: {name: string, title: string, color: string, tag: string, events: any} = {
                        name: item.displayName,
                        title: item.description,
                        color: this.randomBGColor(),
                        tag: 'teams',
                        events: [
                            {
                                title: 'Join',
                                icon: 'plus',
                                data: item
                            }
                        ]
                    
                    }
                    item.listItem = listItem;
                    return item;
                });
                // data.placeholders = [];
                // data.loading = false;
                // data.contextType = 'teams';
                break;
            case 'post':
                data.value.map((item: ListItem) => {
                    const name: string = item.from ? (item.from.user ? item.from.user.displayName : item.from.application?.displayName) : item.messageType
                    const listItem: {name: string, title: string, color: string, tag: string, events: any} = {
                        name:  name, // item.from ? item.from : item.messageType,
                        title: item.lastModifiedDateTime,
                        color: item.from ? this.randomBGColor() : 'lightgrey',
                        tag: 'post',
                        events: [
                            {
                                title: 'Overview',
                                icon: 'file-text-outline',
                                data:item
                            },
                            {
                                title: 'ViewInTeams',
                                icon: 'arrow-forward-outline',
                                data: item
                            }
                        ]
                    };
                    item.listItem = listItem;
                    return item;
                });
                break;
            default:
                break;

        }

        return data;
    }

    randomBGColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 228);
        const b = Math.floor(Math.random() * 255);

        return `rgb(${r},${g},${b})`;
    }
}