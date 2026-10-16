export const currentUser = {
  name: 'Alex Morgan',
  initials: 'AM',
  role: 'User account',
}

export const mockProposal = {
  title: 'Proposed 5G Network Configuration',
  summary:
    "I've prepared a proposed plan for your 5G network. Please review the configuration below.",
  sections: [
    {
      title: 'Network overview',
      rows: [
        ['Network type', '5G Standalone (SA)'],
        ['Core network', 'Open5GS'],
        ['RAN simulator', 'UERANSIM'],
        ['gNBs', '1'],
        ['User equipment (UEs)', '2'],
      ],
    },
    {
      title: 'Proposed network parameters',
      rows: [
        ['MCC', '001'],
        ['MNC', '01'],
        ['TAC', '1'],
        ['DNN', 'internet'],
        ['Slice SST', '1'],
        ['UE subnet', '10.45.0.0/16'],
      ],
    },
  ],
}
