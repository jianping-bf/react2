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
    this.state = { value: false };
  }

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
    this.props.handleChange(this.props.id, this.state.value);
  };
  render() {
    return (
      <div>
        <input
          id={this.props.id}
          type="checkbox"
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}

class ActivityOptions extends React.Component {
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
  }

  render() {
    let header = this.props.header.map((item, index) => <th>{item}</th>);
    let rows = this.props.entries.map((item, index) => (
      <tr>
        <td>
          <button />
        </td>
        <td>{item.name.firstName}</td>
        <td>{item.name.lastName}</td>
        <td>{item.activity}</td>
        <td>
          {item.restrictions.Dietary
            ? "a"
            : "" + item.restrictions.Disability
            ? "b"
            : "" + item.restrictions.MedicalNeeds
            ? "c"
            : ""}
        </td>
      </tr>
    ));

    return (
      <div>
        <table>
          <thead>{header}</thead>
          <tbody>{rows}</tbody>
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
        activity: "",
        restrictions: { Dietary: false, Disability: false, MedicalNeeds: false }
      },
      entries: []
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
    this.setState({ entry: newEntry });
  };

  handleActivity = event => {
    let entry = this.state.entry;
    let newEntry = {
      ...entry,
      activity: event.target.value
    };
    this.setState({ entry: newEntry });
  };

  handleRestrictions = (id, value) => {
    let entry = this.state.entry;
    let newEntry = {
      ...entry,
      restrictions: { ...entry.restrictions, id: value }
    };

    this.setState({ entry: newEntry });
  };

  submit = () => {
    let entries = this.state.entries;
    let newEntries = [...entries];
    newEntries.push(this.state.entry);
    this.setState({ entries: newEntries });
  };

  render() {
    return (
      <div>
        <h3>First Name:</h3>
        <NameInput handleChange={this.handleFirstNameChange} />
        <h3>Last Name:</h3>
        <NameInput handleChange={this.handleLastNameChange} />
        <h3>Select Activity</h3>
        <ActivityOptions
          options={["Science Lab", "Cooking"]}
          handleChange={this.handleActivity}
        />
        <h3>Check All that applies</h3>
        <Selection
          label="a) Dietary Restrictions"
          id="Dietary"
          handleChange={this.handleRestrictions}
        />
        <Selection
          label="b) Physical Diability"
          id="Disability"
          handleChange={this.handleRestrictions}
        />
        <Selection
          label="c) Medical Needs"
          id="MedicalNeeds"
          handleChange={this.handleRestrictions}
        />
        <button onClick={this.submit}>Submit</button>
        <EntryList
          entries={this.state.entries}
          header={[
            "Remove",
            "First Name",
            "Last Name",
            "Activity",
            "Restrictions"
          ]}
        />
      </div>
    );
  }
}
