import React from "react";
import { customRender, fireEvent } from "../../utilities/test-utils";
import BigFlashCard from "./BigFlashCard";

/**
 * Test the big flash card
 */

describe( "Big Flash Card", () => {
  
  test( "BigFlashCard render correctly", () => {
    const { container } = customRender( <BigFlashCard flashCard={ {
      question: "This is" +
        ' a question',
    }}/>);
    expect(container).toMatchSnapshot();
  });
  
  test('position front', () => {
    const {container, getByText} = customRender(<BigFlashCard
      flashCard={{question: 'question', answer: 'answer'}}/>);
    expect(getByText('question')).toBeInTheDocument();
  });
  test('position back', () => {
    const {container, getByTestId, queryByText, debug} = customRender(
      <BigFlashCard
        flashCard={{question: 'question', answer: 'answer'}}/>);
    const card = getByTestId('StyledCardContainer');
    fireEvent.click(card);
    expect(queryByText('answer')).toBeInTheDocument();
    //debug(queryByText('answer'))
  });
  
});