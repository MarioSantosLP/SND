export const currentUser = {
  name: 'Alex Morgan',
  initials: 'AM',
  role: 'User account',
}

export const deploymentSteps = [
  'Validating the network plan',
  'Booking resources',
  'Creating virtual machines on Proxmox',
  'Installing the Open5GS core',
  'Starting the gNB (UERANSIM)',
  'Registering 2 UEs',
  'Running connectivity checks',
]

export const mockDeploymentResult = [
  ['Status', 'Running (Simulated)'],
  ['Core Network', 'Open5GS'],
  ['RAN Simulator', 'UERANSIM'],
  ['gNBs', '1'],
  ['UEs', '2'],
  ['Connectivity', 'Successful (Simulated)'],
]

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

export const mockNetwork = {
  summary: ['5G Standalone (SA)', 'Open5GS', '1 gNB', '2 UEs', 'Deployed (Simulated)'],
  description: '5G SA network with Open5GS, 1 gNB, and 2 UEs.',
  specs: [
    ['Core', 'Open5GS'],
    ['RAN', 'UERANSIM'],
    ['gNBs', '1'],
    ['UEs', '2'],
  ],
}
