import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter } from '@angular/core';

import { TableHead } from './model/table-head';
import { TableConfig } from './model/table-config';
import { TableColumnStyle } from './model/table-column-style';
import { TableBodyStyle } from './model/table-body-style';

import * as _ from 'lodash';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    @Input() heads: TableHead[];
    @Input() body: object[];
    @Input() config: TableConfig;
    @Output() rowClickCallback: EventEmitter<any> = new EventEmitter();

    bodyStyle: TableBodyStyle;
    columnsStyles: TableColumnStyle[];

    constructor() { }

    ngOnInit() {
        this.initConfig();
        this.initColumnsStyles();
    }

    initConfig() {
        this.bodyStyle = {
            height: ''
        };

        if (!this.config) {
            return;
        }

        this.bodyStyle.height = `${ this.config.height }px`;
    }

    initColumnsStyles() {
        this.columnsStyles = _.map(this.heads, item => {
            const value = {
                width: `${item.width}px`
            };

            return new TableColumnStyle(item.match, value);
        });
    }

    getThStyle(match) {
        return this.getColumnStyle(match);
    }

    getTdStyle(match) {
        return this.getColumnStyle(match);
    }

    getColumnStyle(match) {
        // todo: почему это не работает !!!
        // const style2 = _.find(this.columnsStyles, (item: ColumnStyle) => {
        //     if (item.match === match) {
        //         return item;
        //     }
        // });

        // const p = style2.match;

        const style: TableColumnStyle = this.columnsStyles.find(item => {
            return item.match === match;
         });

        return style ? style.value : {};
    }

    rowClick(row) {
        this.rowClickCallback.emit([row]);
    }
}
