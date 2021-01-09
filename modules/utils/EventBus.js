
const eventCallbacksPairs = [];

class EventCallbacksPair {
    constructor(eventType, callback) {
        this.eventType = eventType;
        this.callbacks = [callback];
    }
}

export class EventBus {

    /**
     * Recherche l'existance d'un event dans l'array eventCallbacksPairs
     * 
     * @param String eventType: nom de l'event 
     * @return EventCallbacksPair
     */
    static findEventCallbacksPair(eventType) {
        return eventCallbacksPairs.find(obj => obj.eventType === eventType);
    }


    /**
     * Recherche l'existance d'un event dans l'array eventCallbacksPairs
     * 
     * @param String eventType: nom de l'event 
     * @return int: index de l'EventCallbacksPair
     */
    static findEventCallbacksPairIndex(eventType) {
        return eventCallbacksPairs.findIndex(obj => obj.eventType === eventType);
    }


    /**
     * Permet la diffusion d'un event, donc déclanchement des callbacks lier à l'event
     * 
     * @param String eventType : nom de l'event 
     * @param Mixed args : argument utile au callback
     */
    static post(eventType, args) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);

        if(!eventCallbacksPair) {
            console.error(`Subscribers for event: '${eventType}' not found`);
            return;
        }

        eventCallbacksPair.callbacks.forEach(callback => callback(args));
    }


    /**
     * Permet l'inscription à un event
     * 
     * @param String eventType : nom de l'event 
     * @param function callback : fonction à executer
     */
    static subscribe(eventType, callback) {
        const eventCallbacksPair = this.findEventCallbacksPair(eventType);

        if(eventCallbacksPair) {
            eventCallbacksPair.callbacks.push(callback);
        } else {
            eventCallbacksPairs.push(new EventCallbacksPair(eventType, callback));
        }
    }


    /**
     * Permet la déinscription à un event
     * 
     * @param String eventType : nom de l'event 
     */
    static unsubscribe(eventType) {
        const eventCallbacksPairIndex = this.findEventCallbacksPairIndex(eventType);

        if(eventCallbacksPairIndex === -1) {
            console.error(`Subscribers for event: '${eventType}' not found`);
            return;
        }

        eventCallbacksPairs.splice(eventCallbacksPairIndex, 1);
    }
}