// Based on https://www.geeksforgeeks.org/implementation-queue-javascript/

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        // adding element to the queue
        // Only add element if it is not already present
        const strItems = JSON.stringify(this.items);
        let strElement = JSON.stringify(element);
        // Only consider the actual link, ignoring weight
        if (Array.isArray(element)) {
            strElement = JSON.stringify(element[0]);
        }

        if (strItems.indexOf(strElement) === -1)
            this.items.push(element);
    }

    dequeue() {
        // removing element from the queue
        // returns underflow when called on empty queue
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    front() {
        // returns the Front element of the queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length === 0;
    }

    printQueue() {
        let str = "";
        for (let i = 0; i < this.items.length; i++)
            str += this.items[i] +" ";
        return str;
    }
}