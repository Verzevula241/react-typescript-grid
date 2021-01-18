import * as React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ProductsLoader } from './components/Product_loader/Product_loader';
import { Product } from './interfaces/product.interface.js';
import '@progress/kendo-theme-default/dist/all.css';





class App extends React.Component<{},{}> {

 state = {
      product: { data: [], total: 0, },
      dataState: { take: 10, skip: 0 }
      };

  dataStateChange = (e: any) => {
    this.setState({
      ...this.state,
      dataState: e.dataState
    });
  }

  dataRecieved = (products: Product) => {
    this.setState({
      ...this.state,
      product: {data: products.data, total: products.total}
    });
  }

  render() {
    return (
      <div>
        <Grid
          sortable={true}
          pageable={true}
          {...this.state.dataState}
          {...this.state.product}
          onDataStateChange={this.dataStateChange}
        >
          <Column field="ProductID" filter="numeric" title="Id" />
          <Column field="ProductName" title="Name" />
          <Column field="UnitPrice" filter="numeric" format="{0:c}" title="Price" />
          <Column field="UnitsInStock" filter="numeric" title="In stock" />
        </Grid>

        <ProductsLoader
                    dataState={this.state.dataState}
                    onDataRecieved={this.dataRecieved}
                />
      </div>
    );
  }
}

export default App