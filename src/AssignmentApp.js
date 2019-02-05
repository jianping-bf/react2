import React from "react";

class NameInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.handleChange(event);
  };
  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <div>
        <input
          id={this.props.id}
          type="checkbox"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}

class SelectOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    let options = this.props.options.map((item, index) => (
      <option key={index}>{item}</option>
    ));
    return (
      <div>
        <select value={this.state.value}>{options}</select>
      </div>
    );
  }
}

class EntryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { entries: [] };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    let rows = this.props.entries.map((item, index) => {
      return <div />;
    });
    return (
      <div>
        <table>
          <thead />
          <th>{this.props.header}</th>
        </table>
      </div>
    );
  }
}

export default class AssignmentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        name: { firstName: "", secondName: "" },
        Activity: "",
        Restrictions: { Dietary: false, Disability: false, MedicalNeeds: false }
      }
    };
  }

  handleFirstNameChange = event => {
    //   let {entry: {name: {firstName}}} = this.state
    let entry = this.state.entry;
    let newEntry = {
      ...entry,
      name: { ...entry.name, firstName: event.target.value }
    };
    // this.setState({entry.name.firstName: event.target.value});
    this.setState({ entry: newEntry });
  };

  handleLastNameChange = event => {
    let entry = this.state.entry;
    let newEntry = {
      ...entry,
      name: { ...entry.name, lastName: event.target.value }
    };
  };
  render() {
    return (
      <div>
        <form onSubmit={this.Submit}>
          <h3>First Name:</h3>
          <NameInput handleChange={this.handleFirstNameChange} />
          <h3>Last Name:</h3>
          <NameInput handleChange={this.handleLastNameChange} />
          <h3>Select Activity</h3>
          <SelectOptions options={["Science Lab", "Cooking"]} />
          <h3>Check All that applies</h3>
          <Selection label="Dietary Restrictions" />
          <Selection label="Physical Diability" />
          <Selection label="Medical Needs" />
          <button onClick={this.Submit}>Submit</button>
          <EntryList
            entries={[]}
            header={[
              "Remove",
              "First Name",
              "Last Name",
              "Activity",
              "Restrictions"
            ]}
          />
        </form>
      </div>
    );
  }
}
