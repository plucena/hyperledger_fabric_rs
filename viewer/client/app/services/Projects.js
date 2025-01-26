const projects = [
  {
    name: 'Cooperval Craft Beer',
    id: '7A1E1A65-7D0F-446D-801F-EDBF7E77407E'
  },
  {
    name: 'Sustainable Coffee Seed Project',
    id: '1F06F91A-774B-4E5A-9030-FE9A5A59C978'
  },
];

export default projects;

export function getNameById(id) {
  const project = projects.find(p => p.id === id);
  if (project) {
    return project.name ? project.name : '';
  }
  return '';
}