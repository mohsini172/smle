import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreeComponent} from 'angular2-tree-component';
import {AbstractProcess} from '../../../model/sml/AbstractProcess';

@Component({
    selector: 'object-tree',
    template: require('./ObjectTreeComponent.html'),
    directives: [TreeComponent]
})
export class ObjectTreeComponent implements OnChanges {
    @Input()
    model: AbstractProcess;

    private nodes: Array<INode> = [];

    ngOnChanges(changes: SimpleChanges) {
        this.nodes = this.getNodes(this.model);
    }

    private getNodes(object: any): Array<INode> {
        var nodes: Array<INode>;

        if (object === null || typeof object === 'undefined' || typeof object === 'function') {
            return null;
        }

        if (object instanceof Array) {
            nodes = this.getNodesForArray(object);
        } else if (typeof object === 'object' && !(object instanceof Date)) {
            nodes = this.getNodesForObject(object);
        } else {
            nodes = [{name: object.toString(), children: null}];
        }

        return nodes;
    }

    private getNodesForObject(object: Object): Array<INode> {
        var nodes: Array<INode> = [];

        for (let propertyName in object) {
            if (Object.prototype.hasOwnProperty(propertyName)) {
                continue;
            }

            let newNode: INode = {name: propertyName, children: null};
            let nodeValue: any = object[propertyName];

            newNode.children = this.getNodes(nodeValue);
            nodes.push(newNode);
        }

        return nodes;
    }

    private getNodesForArray(array: Array): Array<INode> {
        var nodes = <Array>array.map((elem: any) => {
            var node: INode = {name: null, children: null};

            if (typeof elem === 'object' && !(elem instanceof Date) || elem instanceof Array) {
                if (typeof elem.label === 'string' && elem.label.length) {
                    node.name = elem.label;
                } else if (typeof elem.name === 'string' && elem.name.length) {
                    node.name = elem.name;
                } else {
                    node.name = elem.constructor.name;
                }

                node.children = this.getNodes(elem);
            } else {
                node.name = elem.toString();
            }

            return node;
        });

        return nodes;
    }
}

interface INode {
    name: string;
    children: Array<INode>;
}
