function handleCardDragEvent(event){
  event.dataTransfer.setData("text", event.target.id);
}

