import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getSelectionActive } from 'shared/model/selectors';

import SelectionBox from 'shared/model/view/selectionBox';

/*
Description: DrawingArea (styled-components) presentational css.

Rationale: I find much easier to have styles and html within the same file, as their logic is cohesive.
   This is also the rationale behind react components, as keeping the html separated from the js (view logic)
   is a separation of technologies, not concerns. And in general this separation of technologies creates
   indirections that will make things more difficult.

   Separated js files from html files will always be coupled and that is fine because it is cohesive logic.
   So why not put them in the same place --> react component.

   The same applies to styles. A react component is a cohesive component of rendering logic.
   react component = HTML + JS + CSS
 */

const DrawingArea = styled.div`
    width: 1px;
    height: 1px;
    position: absolute;
    z-index: 100;
    overflow: visible;
`;


/*
Description: DrawingAreaContainer (react) is the component that renders the active selection box.

Components: Presentational layer.

Rationale: React render function is declarative, meaning it takes some props (style, handler, ids)
   and returns a HTML description of those props.

   The render function (line 101) is a pure function, and again super easy to test.
 */

const DrawingAreaContainer = ({ selectionActive }) =>
    <DrawingArea>
        {
            selectionActive &&
                <SelectionBox />
        }
   </DrawingArea>;

/*
Description: Connect (react-redux) glue between the store (the object that contains the tree state and reducers)
   and a components. react-redux is the official binding library between react and redux by the redux author.

Rationale: It allows a clear separation between presentational components and "smart" higher order components.
   It is a layer of indirection that allows to literally plug plain presentational components
   (like DrawingAreaContainer) to the business layer.

   In this simple case connect is reading if the selection is active from the state, using the
   getSelectionActive selector.
 */

export default connect(
    state => ({
        selectionActive: getSelectionActive(state),
    }),
)(DrawingAreaContainer);

