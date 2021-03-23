import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../Components/collection-item/collection-item.component";
import "./collection.styles.scss";

//match property is available when the component is wrapped using Route from the react-route library
const CollectionPage = ({ collection }) => {
  const { title, items } = collection; //destructuring
  return (
    <div className="collection-page">
      <h2 className="title"> {title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
