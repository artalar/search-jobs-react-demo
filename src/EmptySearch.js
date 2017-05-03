import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class EmptySearch extends React.Component {
  state = {
    open: this.props.state,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ок"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Ничего не найдено"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Пожауйста, повторите поиск с другими параметрами
        </Dialog>
      </div>
    );
  }
}