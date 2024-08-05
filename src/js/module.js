import * as jsonData from '../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

function priorityEditActiveEffectConfig(aeConfigApp, jqHtml, aeData) {
  console.log(`${moduleId} | Hook: renderActiveEffectConfig`);
  // Extract the effect object being modified
  const effect = aeData.effect;

  // Add a "priority" column to the header of the effects list (class "effects-header")
  const header = jqHtml.find('.effects-header');
  const priorityHeader = $('<div class="priority">Priority</div>');
  header.append(priorityHeader);

  // Find the HTML element with class "changes-list"
  const changesList = jqHtml.find('.changes-list');
  // Modify each of the list items in the changes list
  changesList.children().each((index, li) => {
    const existingPriorityValue = effect.changes[index].priority ?? 'default';
    // Add a div with class "priority" to the list item
    // It will be similar to the "value" div which contains <input type="text" name="changes.0.value" value="-1">
    // This will be used to store the priority value
    const priorityDiv = $(
      `<div class="priority"><input type="text" name="changes.${index}.priority" value="${existingPriorityValue}"></div>`,
    );
    $(li).append(priorityDiv);
  });
}
Hooks.on('renderActiveEffectConfig', priorityEditActiveEffectConfig);

Hooks.on('preUpdateActiveEffect', (effect, updateData, options, userId) => {
  const { changes } = updateData;
  for (const change of changes) {
    if (isNaN(change.priority)) {
      change.priority = undefined;
    }
  }
});
