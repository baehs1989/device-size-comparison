import React, {Component} from 'react'
import classes from './Box.module.css'

class Box extends Component {
    render (){
        return (
          <React.Fragment>
            <style dangerouslySetInnerHTML={{
              __html: [
                 `.${classes.Box + "." + this.props.id}:before {`,
                 `  content: '';`,
                 `  position: absolute;`,
                 `  outline: 1px black solid;`,
                 `  top: 0;`,
                 `  width: ${this.props.depth}px;`,
                 `  left: -${this.props.depth}px;`,
                 `  height: 100%;`,
                 `  background: ${this.props.background};`,
                 `  transform-origin: right bottom;`,
                 `  transform: skewY(45deg);`,
                 '}',

                 `.${classes.Box + "." + this.props.id}:after {`,
                 `  content: '';`,
                 `  position: absolute;`,
                 `  outline: 1px black solid;`,
                 `  left: 0;`,
                 `  height: ${this.props.depth}px;`,
                 `  top: -${this.props.depth}px;`,
                 `  width: 100%;`,
                 `  background: ${this.props.background};`,
                 `  transform-origin: bottom left;`,
                 `  transform: skewX(45deg);`,
                 '}'
                ].join('\n')
              }}>
            </style>

            <div className={classes.Box + " " + this.props.id} style={{"height": this.props.height+"px","width":this.props.width+"px", "background" : this.props.background, 'left': (this.props.size *0.25) + "px" }}> </div>
          </React.Fragment>
        )
    }

}

export default Box;
