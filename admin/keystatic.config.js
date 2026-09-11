import { config, fields, collection, singleton } from 'https://esm.sh/@keystatic/core@latest';

export default config({
  storage: {
    kind: 'github',
    repo: 'KetiOslo/kingdom-of-snowstorm',
  },
  collections: {
    dogs: collection({
      label: '🐶 Нашите кучиња',
      slugField: 'name',
      path: 'content/dogs/*',
      format: { data: 'json' },
      fields: {
        name: fields.slug({ name: { label: 'Име на кучето' } }),
        lineage: fields.text({ label: 'Линија / Потекло' }),
        gender: fields.text({ label: 'Пол' }),
        role: fields.text({ label: 'Улога' }),
        narrative: fields.text({ label: 'Опис', multiline: true }),
        image: fields.image({
          label: 'Фотографија',
          directory: 'content/images',
          publicPath: '/content/images',
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: '🏠 Почетна',
      path: 'content/home',
      format: { data: 'json' },
      schema: {
        hero_title: fields.text({ label: 'Главен наслов' }),
        hero_desc: fields.text({ label: 'Воведен текст', multiline: true }),
        box_title: fields.text({ label: 'Наслов на кутија' }),
        box_desc: fields.text({ label: 'Опис на кутија', multiline: true }),
      },
    }),
    gallery: singleton({
      label: '📸 Галерија',
      path: 'content/gallery',
      format: { data: 'json' },
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Наслов' }),
            category: fields.select({
              label: 'Категорија',
              options: [
                { label: 'Shows', value: 'Shows' },
                { label: 'Home Life', value: 'Home Life' },
                { label: 'Puppies', value: 'Puppies' },
                { label: 'Grooming', value: 'Grooming' },
              ],
              defaultValue: 'Shows',
            }),
            image: fields.image({
              label: 'Фотографија',
              directory: 'content/images',
              publicPath: '/content/images',
            }),
            caption: fields.text({ label: 'Опис', multiline: true }),
          }),
          {
            label: 'Фотографии во галерија',
            itemLabel: props => props.value.title || 'Нова слика',
          }
        ),
      },
    }),
  },
});
