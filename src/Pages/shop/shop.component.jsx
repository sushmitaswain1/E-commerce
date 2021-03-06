import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionOverview from "../../Components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../Components/with-spinner/with-spinner.component";


const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
  
  state = {
    loading : true
  }



  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("Collections");
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading : false})
    }); //if the items are updated or it renders for the first time use onSnapshot
  }

  render() {
    const { match } = this.props;
    const {loading} = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}/`}  
        render ={ (props) => <CollectionOverviewWithSpinner isLoading ={loading} {...props}/> } />

        <Route

          path={`${match.path}/:collectionId`}
         render= { (props) => <CollectionPageWithSpinner isLoading ={ loading } {...props} />}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
